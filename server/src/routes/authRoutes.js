const express = require('express');
const passport = require('passport');
const rateLimit = require('express-rate-limit');
const {
  register,
  login,
  logout,
  getMe,
  googleCallback
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * 🎓 TEACHING MOMENT: Express Rate Limiting
 * 
 * Rate limiting prevents brute force and credential stuffing attacks by restricting the number
 * of requests a client can make in a given timeframe.
 */
const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 login requests per window
  message: {
    success: false,
    message: 'Too many login attempts from this IP, please try again after 15 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Auth Routes
router.post('/register', register);
router.post('/login', loginRateLimiter, login);
router.post('/logout', logout);
router.get('/me', protect, getMe);

// Google OAuth Routes
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL || 'http://localhost:5173'}/login?error=GoogleAuthFailed`,
  }),
  googleCallback
);

module.exports = router;
