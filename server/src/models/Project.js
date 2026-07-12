const mongoose = require('mongoose');

/**
 * 🎓 TEACHING MOMENT: Mongoose Schema Design & Data Integrity
 * 
 * In MongoDB, we use Schemas to define the structure of the document, default values, validators,
 * and middleware hooks.
 * 
 * - Required fields ensure database records aren't created in an incomplete, un-renderable state on the UI.
 * - Enums restrict inputs to a predefined list (e.g. status, visibility, category), preventing typos (e.g. "todo" vs "Todo").
 * - Timestamps option automatically injects `createdAt` and `updatedAt` date fields, removing manual tracking.
 */
const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Project name is required'],
      trim: true,
      minlength: [3, 'Project name must be at least 3 characters long'],
      maxlength: [100, 'Project name cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
      minlength: [10, 'Description must be at least 10 characters long'],
    },
    category: {
      type: String,
      required: [true, 'Project category is required'],
      enum: {
        values: ['Backend', 'Frontend', 'Fullstack', 'Mobile', 'Machine Learning', 'DevOps'],
        message: '{VALUE} is not a valid category',
      },
      trim: true,
    },
    visibility: {
      type: String,
      enum: {
        values: ['public', 'private'],
        message: '{VALUE} is not a valid visibility setting',
      },
      default: 'private',
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    templateId: {
      type: String,
      default: 'blank',
    },
    themeColor: {
      type: String,
      default: '#6366f1',
      trim: true,
    },
    techStack: {
      type: [String],
      required: [true, 'Tech stack is required'],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: 'A project must have at least one technology selected',
      },
    },
    priority: {
      type: String,
      enum: {
        values: ['High', 'Medium', 'Low', 'Critical'],
        message: '{VALUE} is not a valid priority level',
      },
      default: 'Medium',
    },
    estimatedDuration: {
      type: String,
      trim: true,
    },
    githubUrl: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          // Allow empty strings, otherwise validate as a basic URL pattern supporting localhost and ports
          if (!v || v.trim() === '') return true;
          return /^(https?:\/\/)?(localhost|[\da-z.-]+)(:\d+)?([\/\w .-]*)*\/?$/i.test(v);
        },
        message: 'Please provide a valid GitHub URL',
      },
    },
    figmaUrl: {
      type: String,
      trim: true,
    },
    apiDocUrl: {
      type: String,
      trim: true,
    },
    postmanUrl: {
      type: String,
      trim: true,
    },
    deploymentUrl: {
      type: String,
      trim: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    deadline: {
      type: Date,
      required: [true, 'Project deadline/target date is required'],
      validate: {
        validator: function (value) {
          // If startDate exists, check if deadline is on or after startDate
          if (this.startDate) {
            return value >= this.startDate;
          }
          return value >= new Date();
        },
        message: 'Deadline cannot be before the start date',
      },
    },
    reminderToggle: {
      type: Boolean,
      default: false,
    },
    reminderDaysBefore: {
      type: Number,
      default: 1,
      min: [1, 'Reminder days must be at least 1'],
    },
    teamMembers: {
      type: [mongoose.Schema.Types.Mixed], // Flexible to store IDs or detailed member objects
      default: [],
    },
    status: {
      type: String,
      enum: {
        values: ['Todo', 'In Progress', 'In Review', 'Completed', 'ACTIVE', 'COMPLETED', 'IN REVIEW', 'ARCHIVED'],
        message: '{VALUE} is not a valid project status',
      },
      default: 'Todo',
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Project owner is required'],
    },
  },
  {
    timestamps: true, // Auto-creates createdAt and updatedAt
  }
);

// Pre-save middleware to align casing for status from frontend to backend standard
ProjectSchema.pre('save', function () {
  // Normalize lowercase status values if they come in
  if (this.status) {
    if (this.status.toUpperCase() === 'ACTIVE') this.status = 'In Progress';
    if (this.status.toUpperCase() === 'IN REVIEW') this.status = 'In Review';
    if (this.status.toUpperCase() === 'COMPLETED') this.status = 'Completed';
  }
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
