// 1. Load environment variables before importing any config/app dependencies
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = require('./app');
const connectDB = require('./config/db');

// Set port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
connectDB();

// Start server listening
const server = app.listen(PORT, () => {
  console.log(`📡 DevNote backend server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

/**
 * 🎓 TEACHING MOMENT: Graceful Shutdown
 * 
 * In production (e.g. Docker, Kubernetes, AWS ECS), containers are frequently stopped and restarted.
 * If you terminate a process abruptly, you risk dropping active client requests mid-execution 
 * and leaving open connections inside MongoDB's connection pool.
 * 
 * Graceful shutdown captures signals like SIGINT/SIGTERM, stops accepting new requests,
 * waits for active requests to finish, and closes DB connections cleanly.
 */
const handleGracefulShutdown = (signal) => {
  console.log(`\n⚠️ Received ${signal}. Starting graceful shutdown...`);

  // Stop accepting new network requests
  server.close(async () => {
    console.log('🛑 HTTP server closed.');

    try {
      // Disconnect from MongoDB Atlas
      const mongoose = require('mongoose');
      await mongoose.connection.close();
      console.log('🔌 MongoDB connection closed successfully.');
      
      console.log('✅ Graceful shutdown completed. Exiting process.');
      process.exit(0);
    } catch (err) {
      console.error(`❌ Error during MongoDB disconnection: ${err.message}`);
      process.exit(1);
    }
  });
};

// Listen for termination signals
process.on('SIGINT', () => handleGracefulShutdown('SIGINT'));
process.on('SIGTERM', () => handleGracefulShutdown('SIGTERM'));

// Handle unhandled Promise rejections (safety net for async/await errors without catch blocks)
process.on('unhandledRejection', (err) => {
  console.error(`💥 Unhandled Promise Rejection: ${err.message}`);
  // In production, we'd log this to an APM system and close the server gracefully
  server.close(() => process.exit(1));
});
