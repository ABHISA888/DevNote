const express = require('express');
const router = express.Router();
const {
  getTasks,
  createTask,
  getProjectTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

/**
 * 🎓 TEACHING MOMENT: Express Task Router & Route-Level Auth Guards
 * 
 * Mounting `protect` as a router-level middleware ensures that all endpoints
 * within `taskRoutes.js` enforce valid JWT authentication before executing controller logic.
 * 
 * Route Endpoints:
 * - GET    /api/tasks                     Get all tasks
 * - POST   /api/tasks                     Create task
 * - GET    /api/tasks/project/:projectId  Get all tasks for a project
 * - GET    /api/tasks/:taskId             Get single task details
 * - PUT    /api/tasks/:taskId             Update task details
 * - DELETE /api/tasks/:taskId             Delete task
 */

router.use(protect);

router.get('/', getTasks);
router.post('/', createTask);
router.get('/project/:projectId', getProjectTasks);
router.get('/:taskId', getTaskById);
router.put('/:taskId', updateTask);
router.delete('/:taskId', deleteTask);

module.exports = router;
