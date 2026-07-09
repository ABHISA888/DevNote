const express = require('express');
const router = express.Router();
const { createProject, getProjects } = require('../controllers/projectController');

/**
 * 🎓 TEACHING MOMENT: RESTful Routing
 * 
 * In REST APIs, the URI maps to a collection of resources, and the HTTP method defines the action.
 * - POST /api/projects: Creates a new project resource.
 * - GET /api/projects: Retrieves the collection of project resources.
 * - This router is mounted in app.js at the prefix '/api/projects', meaning all paths defined
 *   in this file are relative to that prefix. Thus, router.post('/') handles POST requests to '/api/projects'.
 */
router.post('/', createProject);
router.get('/', getProjects);

module.exports = router;
