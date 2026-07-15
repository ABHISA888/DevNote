const express = require('express');
const router = express.Router();
const githubController = require('../controllers/github.controller');
const { protect } = require('../middleware/authMiddleware');

// Protect all routes with auth middleware
router.use(protect);

router.get('/users/search', githubController.searchUsers);
router.get('/user/:username', githubController.getUserProfile);
router.get('/repository', githubController.getRepository);
router.get('/readme', githubController.getReadme);
router.get('/contributors', githubController.getContributors);
router.get('/languages', githubController.getLanguages);

module.exports = router;
