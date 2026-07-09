const mongoose = require('mongoose');

/**
 * 🎓 TEACHING MOMENT: MongoDB Connection Setup with Mongoose
 * 
 * Why Mongoose?
 * Mongoose acts as an Object Data Modeling (ODM) library for MongoDB. It provides a schema-based
 * solution to model application data, handles validation, query building, and manages connection states.
 * 
 * Connection Options:
 * - autoIndex: Set to true by default, but in high-scale production setups, you might turn it off
 *   to avoid index builds impacting database write performance.
 * - serverSelectionTimeoutMS: Keeps try-to-connect time limited (5000ms is standard) so the app 
 *   doesn't hang indefinitely if the DB is down.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`🚀 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // Exit process with failure (1) to fail-fast
    process.exit(1);
  }
};

// Handle connection events for resiliency
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB connection lost. Attempting to reconnect...');
});

mongoose.connection.on('error', (err) => {
  console.error(`❌ Mongoose Connection Error Event: ${err.message}`);
});

module.exports = connectDB;
