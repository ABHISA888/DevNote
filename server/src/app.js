const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const passport = require('passport');
const projectRoutes = require('./routes/projectRoutes');
const authRoutes = require('./routes/authRoutes');
const githubRoutes = require('./routes/github.routes');
const noteRoutes = require('./routes/noteRoutes');
const envVarRoutes = require('./routes/envVarRoutes');

// Load Passport config
require('./config/passport');

// Initialize the Express app
const app = express();

/**
 * 🎓 TEACHING MOMENT: Express Middleware Stack
 * 
 * Middleware functions are functions that have access to the request object (req), the response 
 * object (res), and the next middleware function in the application’s request-response cycle.
 * 
 * Order is critical:
 * 1. CORS & Helmet: Security headers and cross-origin setup must be defined first.
 * 2. express.json(): Parses incoming requests with JSON payloads.
 * 3. express.urlencoded(): Parses incoming requests with URL-encoded payloads.
 * 4. cookieParser(): Parses cookie headers and populates `req.cookies`.
 * 5. passport.initialize(): Prepares Passport OAuth.
 */

// Use Helmet to secure Express headers
app.use(helmet());

// 1. CORS Configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:5176'
];

if (process.env.CLIENT_URL) {
  allowedOrigins.push(process.env.CLIENT_URL);
}

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
      return callback(null, true);
    }
    return callback(new Error('CORS Not Allowed'));
  },
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// 2. Global Request Parsers
app.use(express.json({ limit: '10mb' })); // Limit body sizes to protect from DOS attacks
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Initialize passport
app.use(passport.initialize());

// 3. API Routes Mount Points
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/projects/:projectId/notes', noteRoutes);
app.use('/api/projects/:projectId/envvars', envVarRoutes);
app.use('/api/github', githubRoutes);

// Simple health check endpoint to check server availability
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'DevNote Server is active and healthy.'
  });
});

// 4. Fallback 404 Route handler for unmatched requests
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Not Found - The requested URL ${req.originalUrl} does not exist.`
  });
});

// 5. Global Centralized Error Handling Middleware
// 🎓 TEACHING MOMENT: Express Centralized Error Handling
// An error handling middleware must accept exactly 4 arguments: (err, req, res, next).
// This is how Express differentiates it from regular middleware. Any unhandled error inside
// controllers or middleware will be passed to this handler via `next(err)`.
app.use((err, req, res, next) => {
  console.error(`💥 Centralized Error: ${err.stack}`);

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    // Only return the stack trace during development to avoid leaking system paths to users
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

module.exports = app;
