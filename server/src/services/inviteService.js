const crypto = require('crypto');
const Invite = require('../models/Invite');
const Project = require('../models/Project');
const User = require('../models/User');
const TeamMember = require('../models/TeamMember');
const emailService = require('./emailService'); 

/**
 * 🎓 TEACHING MOMENT: The Service Layer Pattern
 * 
 * WHY IT EXISTS: 
 * If we put all this logic in the controller, the controller becomes massive (a "fat controller").
 * By moving business logic here, the Service can be reused (e.g., triggered by a cron job or an admin panel),
 * tested easily in isolation, and keeps our routing layer clean.
 */
class InviteService {
  /**
   * Generates a secure, random token and its hashed counterpart.
   * 
   * 🎓 SECURITY LESSON: Tokens vs JWTs
   * Why not a JWT? JWTs contain embedded data and a signature. We just need a one-time random string.
   * Why Hash? If our database is compromised, the attacker only gets the hash. They cannot use the hash
   * to accept the invite because the endpoint requires the PLAIN token (which is only sent to the user's email).
   */
  static generateToken() {
    const plainToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(plainToken).digest('hex');
    console.log('[DEBUG - InviteService] Generated secure one-time tokens.');
    return { plainToken, hashedToken };
  }

  /**
   * Fetch all pending invitations for a specific project.
   */
  static async getPendingInvites(projectId) {
    console.log(`[DEBUG - InviteService] Fetching pending invites for project: ${projectId}`);
    return await Invite.find({ project: projectId, status: 'pending' }).sort({ createdAt: -1 });
  }

  /**
   * Creates a new invitation and dispatches the email.
   */
  static async createInvitation({ projectId, invitedEmail, invitedByUserId, role = 'viewer', message = '' }) {
    console.log(`[DEBUG - InviteService] createInvitation started for email: ${invitedEmail}`);
    
    // 1. Validate Project & Ownership
    const project = await Project.findById(projectId);
    if (!project) throw new Error('Project not found');
    
    if (project.owner.toString() !== invitedByUserId.toString()) {
      throw new Error('Unauthorized: Only the project owner can invite members');
    }

    // 2. Prevent Inviting Existing Members
    const invitedUser = await User.findOne({ email: invitedEmail.toLowerCase() });
    if (invitedUser) {
      if (project.owner.toString() === invitedUser._id.toString()) {
        throw new Error('User is the project owner');
      }

      const existingMember = await TeamMember.findOne({ project: projectId, user: invitedUser._id });
      if (existingMember) {
        throw new Error('User is already a team member in this project');
      }
    }

    // 3. DUPLICATE INVITATION PREVENTION
    const existingInvite = await Invite.findOne({ 
      project: projectId, 
      invitedEmail: invitedEmail.toLowerCase(),
      status: 'pending' 
    });

    if (existingInvite) {
      if (existingInvite.expiresAt < new Date()) {
        existingInvite.status = 'expired';
        await existingInvite.save();
        console.log('[DEBUG - InviteService] Found expired invite, marked as expired.');
      } else {
        throw new Error('This user already has a pending invitation.');
      }
    }

    // 4. Generate Tokens and Expiration (7 days)
    const { plainToken, hashedToken } = this.generateToken();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    // 5. Save Invitation
    const newInvite = new Invite({
      project: projectId,
      invitedEmail: invitedEmail.toLowerCase(),
      invitedBy: invitedByUserId,
      role,
      token: hashedToken,
      expiresAt,
      // Optional message field if your model supports it, but keeping it simple for MVP
    });

    await newInvite.save();
    console.log(`[DEBUG - InviteService] Invite Saved to MongoDB with ID: ${newInvite._id}`);

    // 6. EMAIL FAILURE HANDLING (Option A: Delete on Failure)
    try {
      console.log(`[DEBUG - InviteService] SMTP Started for: ${invitedEmail}`);
      const inviter = await User.findById(invitedByUserId);
      await emailService.sendProjectInvitation({
        to: invitedEmail,
        projectName: project.name,
        inviterName: inviter.name,
        inviteToken: plainToken,
        role
      });
      console.log(`[DEBUG - InviteService] SMTP Finished successfully for: ${invitedEmail}`);
    } catch (error) {
      // Rollback: Delete the orphaned invite
      console.log(`[DEBUG - InviteService] SMTP Failed: ${error.message}. Triggering Rollback.`);
      await Invite.findByIdAndDelete(newInvite._id);
      throw new Error(`Failed to send invitation email: ${error.message}`);
    }

    return newInvite;
  }

  /**
   * Verifies if a token is valid, hasn't expired, and belongs to a pending invite.
   */
  static async verifyInvitation(plainToken) {
    const hashedToken = crypto.createHash('sha256').update(plainToken).digest('hex');
    console.log(`[DEBUG - InviteService] Verifying token hash: ${hashedToken}`);
    
    const invite = await Invite.findOne({ token: hashedToken }).populate('project').populate('invitedBy', 'name email');
    if (!invite) throw new Error('Invalid invitation token');
    
    if (invite.status === 'pending' && invite.expiresAt < new Date()) {
      invite.status = 'expired';
      await invite.save();
      throw new Error('This invitation has expired');
    }

    if (invite.status !== 'pending') {
      throw new Error(`This invitation is no longer valid (Status: ${invite.status})`);
    }

    return invite;
  }

  /**
   * Accepts the invitation and adds the user to the project using TeamMember.
   */
  static async acceptInvitation(plainToken, acceptingUser) {
    console.log(`[DEBUG - InviteService] acceptInvitation started for User: ${acceptingUser.email}`);
    const invite = await this.verifyInvitation(plainToken);
    
    const project = await Project.findById(invite.project._id);
    if (!project) throw new Error('Project no longer exists');

    // Add member (Prevent duplicates just in case)
    const existingMember = await TeamMember.findOne({ project: project._id, user: acceptingUser._id });

    if (!existingMember) {
      await TeamMember.create({
        project: project._id,
        user: acceptingUser._id,
        githubUsername: acceptingUser.name.replace(/\s+/g, '').toLowerCase() || 'inviteduser',
        githubAvatar: acceptingUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${acceptingUser.email}`,
        githubUrl: 'https://github.com',
        displayName: acceptingUser.name || 'Invited User',
        role: invite.role,
      });
      console.log(`[DEBUG - InviteService] Member Added to project via TeamMember collection`);
    }

    // Update invite status
    invite.status = 'accepted';
    await invite.save();
    console.log(`[DEBUG - InviteService] Invite Accepted and status updated.`);

    return project;
  }
}

module.exports = InviteService;
