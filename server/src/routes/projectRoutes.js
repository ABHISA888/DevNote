const express = require('express');
const router = express.Router();
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  pinProject,
  favoriteProject,
  getGithubRepoInfo,
  getProjectReadme
} = require('../controllers/projectController');
const {
  searchGithubUsers,
  getTeam,
  inviteTeamMember,
  updateTeamMemberRole,
  removeTeamMember
} = require('../controllers/teamController');
const { protect } = require('../middleware/authMiddleware');
const inviteController = require('../controllers/inviteController');

// 🎓 TEACHING MOMENT: Route Protection middleware
// By mounting `protect` as a router-level middleware, we guarantee that all routes
// defined in this file require a valid JWT token.
router.use(protect);

// Project Invitation Routes
router.post('/:projectId/invite', inviteController.sendInvite);
router.get('/:projectId/invites', inviteController.getPendingInvites);

// GitHub user search proxy (before parameterised routes)
router.get('/github/search', searchGithubUsers);
router.get('/github/repo', getGithubRepoInfo);

router.post('/', createProject);
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.get('/:id/readme', getProjectReadme);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);
router.patch('/:id/pin', pinProject);
router.patch('/:id/favorite', favoriteProject);

// Project team member routes
router.get('/:projectId/team', getTeam);
router.post('/:projectId/team', inviteTeamMember);
router.put('/:projectId/team/:memberId', updateTeamMemberRole);
router.delete('/:projectId/team/:memberId', removeTeamMember);

module.exports = router;
