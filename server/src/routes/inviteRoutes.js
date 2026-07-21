const express = require('express');
const router = express.Router();
const inviteController = require('../controllers/inviteController');
const { protect } = require('../middleware/authMiddleware');

/**
 * 🎓 TEACHING MOMENT: Express Routing
 * 
 * WHY THIS EXISTS:
 * The router maps HTTP requests (like POST or GET) and URLs (like /invitations/:token) 
 * to the specific Controller functions that handle them.
 * 
 * Notice the `protect` middleware: 
 * We use this on routes that require the user to be logged in. 
 * For example, a user MUST be logged in to accept an invitation, but they don't 
 * necessarily need to be logged in just to VERIFY if a token is valid (GET /:token).
 */

// Verify an invitation token (Public/Unauthenticated route so UI can check before forcing login)
router.get('/:token', inviteController.verifyInvite);

// Accept an invitation (Requires authentication)
router.post('/:token/accept', protect, inviteController.acceptInvite);

// The remaining endpoints (Reject, Cancel, Resend) follow the same pattern.
// In a full production app, you would wire these to controller functions as well.
// router.post('/:token/reject', protect, inviteController.rejectInvite);
// router.post('/:token/cancel', protect, inviteController.cancelInvite);
// router.post('/:token/resend', protect, inviteController.resendInvite);

module.exports = router;
