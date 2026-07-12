const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * 🎓 TEACHING MOMENT: Authentication Middleware
 * 
 * Middleware interceptors run before the controller logic.
 * This protect middleware verifies the incoming JWT. If the token is valid, it retrieves 
 * the user profile and assigns it to `req.user`, allowing down-stream routes to access the user context.
 */
exports.protect = async (req, res, next) => {
  let token;

  // 1. Check for Bearer token in the Authorization Header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  // 2. Check for token in the httpOnly Cookie
  else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // Verify token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route. No token provided.',
    });
  }

  try {
    // Decode and verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Retrieve user and attach to request object
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route. User no longer exists.',
      });
    }

    next();
  } catch (error) {
    console.error(`Authentication error: ${error.message}`);
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route. Invalid or expired token.',
    });
  }
};
