const User = require('../models/User');
const generateToken = require('../utils/generateToken');

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // 1. Controller-level Validation
    if (!name || name.trim() === '') {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }
    if (!email || email.trim() === '') {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }
    if (!password || password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long',
      });
    }

    // 2. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'A user with this email address is already registered',
      });
    }

    // 3. Create the local User
    const user = await User.create({
      name,
      email,
      password,
      provider: 'local',
    });

    // 4. Generate JWT & Set cookie
    const token = generateToken(res, user._id);

    // Hide password before returning
    user.password = undefined;

    return res.status(201).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    console.error(`Register Error: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Authenticate local user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password',
      });
    }

    // 2. Find user & select password explicitly
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // 3. Verify provider
    if (user.provider !== 'local') {
      return res.status(400).json({
        success: false,
        message: `This account is linked via Google login. Please sign in using Google.`,
      });
    }

    // 4. Match password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // 5. Generate token and cookie
    const token = generateToken(res, user._id);

    user.password = undefined;

    return res.status(200).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    console.error(`Login Error: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Log user out & clear token cookie
 * @route   POST /api/auth/logout
 * @access  Public
 */
exports.logout = async (req, res, next) => {
  try {
    // Clear cookie
    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 5000), // Expires in 5 seconds
      httpOnly: true,
    });

    return res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error(`Logout Error: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Get current authenticated user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(`GetMe Error: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Redirect handler post Google callback
 * @route   GET /api/auth/google/callback callback redirect
 * @access  Private/OAuth
 */
exports.googleCallback = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5173'}/login?error=GoogleAuthFailed`);
    }

    // Generate JWT token for Google user
    const token = generateToken(res, req.user._id);

    // Redirect to frontend login/dashboard with the token
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    return res.redirect(`${clientUrl}/login?token=${token}`);
  } catch (error) {
    console.error(`Google Callback Redirect Error: ${error.message}`);
    res.redirect(`${process.env.CLIENT_URL || 'http://localhost:5173'}/login?error=ServerError`);
  }
};
