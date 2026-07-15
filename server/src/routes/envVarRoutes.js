const express = require('express');
const router = express.Router({ mergeParams: true });
const {
  getEnvVars,
  createEnvVar,
  updateEnvVar,
  deleteEnvVar
} = require('../controllers/envVarController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/')
  .get(getEnvVars)
  .post(createEnvVar);

router.route('/:envVarId')
  .patch(updateEnvVar)
  .delete(deleteEnvVar);

module.exports = router;
