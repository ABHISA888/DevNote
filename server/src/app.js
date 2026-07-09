const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const projectRoutes = require('./routes/projectRoutes');

// Initialize the Express app
const app = express();

/**
 * 🎓 TEACHING MOMENT: Express Middleware Stack
 * 
 * Middleware functions are functions that have access to the request object (req), the response 
 * object (res), and the next middleware function in the application’s request-response cycle.
 * 
 * Order is critical:
 * 1. CORS: Must be defined first so that pre-flight OPTIONS requests from browsers are resolved immediately.
 * 2. express.json(): Parses incoming requests with JSON payloads. If a POST request has no JSON parser,
 *    `req.body` will be undefined inside the controller.
 * 3. express.urlencoded(): Parses incoming requests with URL-encoded payloads (useful for form submissions).
 * 4. cookieParser(): Parses cookie headers and populates `req.cookies`. Essential for secure JWT storage in cookies.
 */

// 1. CORS Configuration
const corsOptions = {
  // Allow requests from client dev server (usually localhost:5173 or localhost:3000)
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true, // Allow cookies/auth headers to be sent
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// 2. Global Request Parsers
app.use(express.json({ limit: '10mb' })); // Limit body sizes to protect from DOS attacks
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// 3. API Routes Mount Points
// We mount all project routes at the prefix '/api/projects'
app.use('/api/projects', projectRoutes);

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
