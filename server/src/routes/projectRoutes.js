const express = require('express');
const router = express.Router();
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  pinProject,
  favoriteProject
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

// 🎓 TEACHING MOMENT: Route Protection middleware
// By mounting `protect` as a router-level middleware, we guarantee that all routes
// defined in this file require a valid JWT token.
router.use(protect);

router.post('/', createProject);
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);
router.patch('/:id/pin', pinProject);
router.patch('/:id/favorite', favoriteProject);

module.exports = router;
