const InviteService = require('../services/inviteService');

/**
 * 🎓 TEACHING MOMENT: The Controller Layer
 * 
 * WHY IT EXISTS:
 * Controllers act as the "traffic cops" of our API. They shouldn't contain heavy business logic 
 * or database queries. Their sole responsibility is to:
 * 1. Extract data from the incoming HTTP Request (req.body, req.params, req.user).
 * 2. Validate that the necessary data is present.
 * 3. Pass the clean data to the Service Layer.
 * 4. Take the Service Layer's result and formulate a proper HTTP Response (res.status.json).
 */

exports.sendInvite = async (req, res) => {
  console.log(`[DEBUG - Controller Entry] POST /projects/${req.params.projectId}/invite`);
  try {
    const { projectId } = req.params;
    const { email, role, message } = req.body;
    
    console.log(`[DEBUG - Incoming Request] email: ${email}, role: ${role}`);
    const invitedByUserId = req.user._id;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const invite = await InviteService.createInvitation({
      projectId,
      invitedEmail: email,
      invitedByUserId,
      role,
      message
    });

    res.status(201).json({ 
      success: true,
      message: 'Invitation sent successfully', 
      data: invite
    });
  } catch (error) {
    console.error('[DEBUG - Controller Error] Send Invite:', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getPendingInvites = async (req, res) => {
  console.log(`[DEBUG - Controller Entry] GET /projects/${req.params.projectId}/invites`);
  try {
    const { projectId } = req.params;
    
    // In a real app we might also check if req.user has access to this project
    const invites = await InviteService.getPendingInvites(projectId);

    res.status(200).json({
      success: true,
      data: invites
    });
  } catch (error) {
    console.error('[DEBUG - Controller Error] Get Invites:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.verifyInvite = async (req, res) => {
  console.log(`[DEBUG - Controller Entry] GET /invitations/${req.params.token}`);
  try {
    const { token } = req.params;
    
    const invite = await InviteService.verifyInvitation(token);
    
    res.status(200).json({ 
      success: true,
      message: 'Token is valid',
      data: {
        projectId: invite.project._id,
        project: invite.project.name,
        invitedBy: invite.invitedBy.name,
        role: invite.role,
        email: invite.invitedEmail
      }
    });
  } catch (error) {
    console.error('[DEBUG - Controller Error] Verify Invite:', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.acceptInvite = async (req, res) => {
  console.log(`[DEBUG - Controller Entry] POST /invitations/${req.params.token}/accept`);
  try {
    const { token } = req.params;
    const acceptingUser = req.user;

    const project = await InviteService.acceptInvitation(token, acceptingUser);

    res.status(200).json({ 
      success: true,
      message: 'Invitation accepted successfully',
      data: {
        projectId: project._id 
      }
    });
  } catch (error) {
    console.error('[DEBUG - Controller Error] Accept Invite:', error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};
