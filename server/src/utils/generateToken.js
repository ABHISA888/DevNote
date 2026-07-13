const jwt = require('jsonwebtoken');

/**
 * 🎓 TEACHING MOMENT: Token Security & JWT Storage
 * 
 * Storing JWTs in httpOnly cookies prevents Cross-Site Scripting (XSS) attacks from accessing 
 * the token via JavaScript (`document.cookie`).
 * Returning the token in JSON allows frontend client architectures to cache the token in memory
 * or local stores for immediate requests.
 */
const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });

  const cookieOptions = {
    expires: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  };

  res.cookie('token', token, cookieOptions);

  return token;
};

module.exports = generateToken;
