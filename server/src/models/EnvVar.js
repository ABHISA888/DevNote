const mongoose = require('mongoose');

const EnvVarSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: [true, 'Project reference is required'],
    },
    key: {
      type: String,
      required: [true, 'Environment variable key is required'],
      trim: true,
    },
    value: {
      type: String,
      required: [true, 'Environment variable value is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    environment: {
      type: String,
      enum: ['Development', 'Testing', 'Production'],
      required: [true, 'Environment target is required'],
    },
    isSecret: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Created by user is required'],
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate keys per project per environment
EnvVarSchema.index({ project: 1, environment: 1, key: 1 }, { unique: true });

module.exports = mongoose.model('EnvVar', EnvVarSchema);
