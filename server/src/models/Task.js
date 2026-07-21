const mongoose = require('mongoose');

/**
 * 🎓 TEACHING MOMENT: Mongoose Task Schema Design & Workflow Management
 * 
 * In a developer productivity platform like DevNote, Task entities belong to a specific Project.
 * Tasks organize work items (e.g., "Build Backend", "Connect MongoDB", "Deploy API").
 * 
 * Key Design Principles:
 * 1. Strict Enums: Enforce valid values for task workflow (`status` and `priority`) to prevent state corruption.
 * 2. Database References: Relate tasks to a parent Project and User accounts for assignment & auditability.
 * 3. Pre-save Hooks: Automatically manage completion dates when status transitions to 'Completed'.
 * 4. Indexes: Index project and user IDs to optimize query performance when rendering kanban boards.
 */
const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      minlength: [1, 'Task title cannot be empty'],
      maxlength: [200, 'Task title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: {
        values: ['Todo', 'In Progress', 'Review', 'Completed'],
        message: '{VALUE} is not a valid task status',
      },
      default: 'Todo',
      trim: true,
    },
    priority: {
      type: String,
      enum: {
        values: ['Low', 'Medium', 'High', 'Critical'],
        message: '{VALUE} is not a valid priority level',
      },
      default: 'Medium',
      trim: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: [true, 'Parent project is required'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    startDate: {
      type: Date,
      default: null,
    },
    dueDate: {
      type: Date,
      default: null,
    },
    completedAt: {
      type: Date,
      default: null,
    },
    estimatedHours: {
      type: Number,
      default: 0,
      min: [0, 'Estimated hours cannot be negative'],
    },
    actualHours: {
      type: Number,
      default: 0,
      min: [0, 'Actual hours cannot be negative'],
    },
    labels: {
      type: [String],
      default: [],
    },
    attachments: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
    progress: {
      type: Number,
      default: 0,
      min: [0, 'Progress cannot be less than 0'],
      max: [100, 'Progress cannot exceed 100'],
    },
    githubUsername: {
      type: String,
      default: '',
      trim: true,
    },
    githubAvatar: {
      type: String,
      default: '',
      trim: true,
    },
    githubProfile: {
      type: String,
      default: '',
      trim: true,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Auto-generates createdAt and updatedAt fields
  }
);

// Optimize lookups by indexing project and created date
TaskSchema.index({ project: 1, createdAt: -1 });
TaskSchema.index({ user: 1 });
TaskSchema.index({ assignedTo: 1 });

// Pre-save hook to update completion timestamp automatically
TaskSchema.pre('save', function (next) {
  if (this.isModified('status')) {
    if (this.status === 'Completed' && !this.completedAt) {
      this.completedAt = new Date();
    } else if (this.status !== 'Completed') {
      this.completedAt = null;
    }
  }
  next();
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
