const express = require('express');
const router = express.Router();
const { createProject, getProjects } = require('../controllers/projectController');

/**
 * 🎓 TEACHING MOMENT: RESTful Routing
 * 
 * In REST APIs, the URI maps to a collection of resources, and the HTTP method defines the action.
 * - GET /api/projects: Retrieves a list of project resources.
 * - POST /api/projects: Creates a new project resource.
 * - This router is mounted in app.js at the prefix '/api/projects', meaning all paths defined
 *   in this file are relative to that prefix. Thus, router.post('/') handles POST requests to '/api/projects'.
 * 
 * Future security integration:
 * To protect this route, we would insert an auth middleware:
 *   const { protect } = require('../middleware/authMiddleware');
 *   router.post('/', protect, createProject);
 */
router.get('/', getProjects);
router.post('/', createProject);

module.exports = router;
