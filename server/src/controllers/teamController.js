const axios = require('axios');
const Project = require('../models/Project');
const User = require('../models/User');
const TeamMember = require('../models/TeamMember');

/**
 * @desc    Search GitHub Users
 * @route   GET /api/projects/github/search
 * @access  Private
 */
exports.searchGithubUsers = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Search query parameter q is required',
      });
    }

    const response = await axios.get(`https://api.github.com/search/users?q=${encodeURIComponent(q)}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'DevNote-App',
      },
    });

    return res.status(200).json({
      success: true,
      items: response.data.items || [],
    });
  } catch (error) {
    console.error('Error searching github users:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to search GitHub users',
    });
  }
};

/**
 * @desc    Get Project Team Members
 * @route   GET /api/projects/:projectId/team
 * @access  Private
 */
exports.getTeam = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId).populate('owner');
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // Find members
    let members = await TeamMember.find({ project: projectId }).populate('user', 'name email avatar');

    // Ensure Owner is seeded
    const hasOwner = members.some((m) => m.user && m.user._id.toString() === project.owner._id.toString());
    if (!hasOwner) {
      try {
        const ownerMember = await TeamMember.create({
          project: projectId,
          user: project.owner._id,
          githubUsername: project.owner.name.replace(/\s+/g, '').toLowerCase(),
          githubAvatar: project.owner.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Owner',
          githubUrl: 'https://github.com',
          displayName: project.owner.name,
          role: 'Owner',
        });
        const populated = await TeamMember.findById(ownerMember._id).populate('user', 'name email avatar');
        members.push(populated);
      } catch (err) {
        console.error('Error seeding owner team member:', err.message);
      }
    }

    return res.status(200).json({
      success: true,
      data: members,
    });
  } catch (error) {
    console.error('Error in getTeam controller:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch team members',
    });
  }
};

/**
 * @desc    Invite/Add Team Member
 * @route   POST /api/projects/:projectId/team
 * @access  Private
 */
exports.inviteTeamMember = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { githubUsername, role } = req.body;

    if (!githubUsername || githubUsername.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'GitHub Username is required',
      });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // Only owner can add members
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Only the project owner can invite team members',
      });
    }

    // Get GitHub Profile Details (Phase 3B)
    let gitHubProfile;
    try {
      const githubRes = await axios.get(`https://api.github.com/users/${encodeURIComponent(githubUsername)}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'DevNote-App',
        },
      });
      gitHubProfile = githubRes.data;
    } catch (err) {
      return res.status(404).json({
        success: false,
        message: `GitHub user "${githubUsername}" not found`,
      });
    }

    // Check if User exists in db, otherwise create a stub User
    const fallbackEmail = `${gitHubProfile.login.toLowerCase()}@github.tmp`;
    const searchEmail = gitHubProfile.email || fallbackEmail;
    let user = await User.findOne({ email: searchEmail });

    if (!user) {
      user = await User.create({
        name: gitHubProfile.name || gitHubProfile.login,
        email: searchEmail,
        avatar: gitHubProfile.avatar_url,
        provider: 'local', // registered placeholder
        password: Math.random().toString(36).slice(-10) + 'A1!',
        role: 'user',
      });
    }

    // Check if already a member of the project
    const existingMember = await TeamMember.findOne({ project: projectId, user: user._id });
    if (existingMember) {
      return res.status(400).json({
        success: false,
        message: 'User is already a team member in this project',
      });
    }

    // Create TeamMember
    const member = await TeamMember.create({
      project: projectId,
      user: user._id,
      githubUsername: gitHubProfile.login,
      githubAvatar: gitHubProfile.avatar_url,
      githubUrl: gitHubProfile.html_url,
      displayName: gitHubProfile.name || gitHubProfile.login,
      role: role || 'Viewer',
    });

    const populated = await TeamMember.findById(member._id).populate('user', 'name email avatar');

    return res.status(201).json({
      success: true,
      message: 'Team member added successfully',
      data: populated,
    });
  } catch (error) {
    console.error('Error in inviteTeamMember controller:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to add team member',
    });
  }
};

/**
 * @desc    Change Role of a Team Member
 * @route   PUT /api/projects/:projectId/team/:memberId
 * @access  Private
 */
exports.updateTeamMemberRole = async (req, res) => {
  try {
    const { projectId, memberId } = req.params;
    const { role } = req.body;

    if (!['Owner', 'Editor', 'Viewer'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role level',
      });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // Only owner can modify roles
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Only the project owner can modify team roles',
      });
    }

    const member = await TeamMember.findOne({ _id: memberId, project: projectId });
    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found',
      });
    }

    // Cannot change owner role if they are the primary owner user of the project
    if (member.user.toString() === project.owner.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Cannot modify primary project owner role',
      });
    }

    member.role = role;
    await member.save();

    const populated = await TeamMember.findById(member._id).populate('user', 'name email avatar');

    return res.status(200).json({
      success: true,
      message: 'Role updated successfully',
      data: populated,
    });
  } catch (error) {
    console.error('Error in updateTeamMemberRole controller:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to update member role',
    });
  }
};

/**
 * @desc    Remove Member from Project Team
 * @route   DELETE /api/projects/:projectId/team/:memberId
 * @access  Private
 */
exports.removeTeamMember = async (req, res) => {
  try {
    const { projectId, memberId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    // Only owner can remove members
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Only the project owner can remove team members',
      });
    }

    const member = await TeamMember.findOne({ _id: memberId, project: projectId });
    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found',
      });
    }

    // Cannot remove the primary owner
    if (member.user.toString() === project.owner.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Cannot remove primary project owner from team',
      });
    }

    await member.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Team member removed successfully',
    });
  } catch (error) {
    console.error('Error in removeTeamMember controller:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to remove team member',
    });
  }
};
