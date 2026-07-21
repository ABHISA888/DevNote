const mongoose = require('mongoose');

/**
 * 🎓 TEACHING MOMENT: The Invite Schema
 * 
 * DESIGN PATTERN: The Active Record / Data Mapper Pattern (via Mongoose)
 * 
 * We are defining the shape of our data. Mongoose acts as an ODM (Object Data Modeling) library, 
 * sitting between our Node application and the MongoDB database. It provides validation, casting, 
 * and business logic hooks out of the box.
 */
const InviteSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: [true, 'An invitation must be associated with a project'],
      index: true // Indexing this field makes lookups by project significantly faster!
    },
    invitedEmail: {
      type: String,
      required: [true, 'An email address is required to invite a user'],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address'
      ]
    },
    invitedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'We need to know who sent this invitation']
    },
    role: {
      type: String,
      enum: {
        values: ['viewer', 'editor', 'owner'],
        message: '{VALUE} is not a valid role'
      },
      default: 'viewer' // Future-proofing: defaults to the safest permission level
    },
    token: {
      type: String,
      required: [true, 'An invitation token is required for security verification'],
      // Note: We will ONLY store the HASH of the token here, never the plain text version!
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'accepted', 'expired', 'cancelled'],
        message: '{VALUE} is not a valid invitation status'
      },
      default: 'pending'
    },
    expiresAt: {
      type: Date,
      required: [true, 'An invitation must have an expiration date']
    }
  },
  {
    timestamps: true // Automatically manages createdAt and updatedAt
  }
);

/**
 * Mongoose Compound Index
 * We create an index combining the project and invitedEmail to ensure that database 
 * searches looking for existing invitations (to prevent duplicates) are blazing fast.
 */
InviteSchema.index({ project: 1, invitedEmail: 1 });

const Invite = mongoose.model('Invite', InviteSchema);

module.exports = Invite;
