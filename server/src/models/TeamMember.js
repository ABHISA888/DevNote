const mongoose = require('mongoose');

const TeamMemberSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: [true, 'Project reference is required'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
    },
    githubUsername: {
      type: String,
      required: [true, 'GitHub Username is required'],
      trim: true,
    },
    githubAvatar: {
      type: String,
      trim: true,
    },
    githubUrl: {
      type: String,
      trim: true,
    },
    displayName: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ['Owner', 'Editor', 'Viewer'],
      default: 'Viewer',
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate user in the same project
TeamMemberSchema.index({ project: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('TeamMember', TeamMemberSchema);
