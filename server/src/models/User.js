const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * 🎓 TEACHING MOMENT: User Schema Design
 * 
 * - `email`: Validated via Regex, unique and lowercase to prevent duplicate registrations.
 * - `password`: Conditional required validation (only required for 'local' signups).
 *               `select: false` prevents returning the hashed password by default.
 * - `provider`: Specifies if the user registered locally or via Google OAuth.
 */
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email address',
      ],
    },
    password: {
      type: String,
      required: function () {
        return this.provider === 'local';
      },
      minlength: [8, 'Password must be at least 8 characters long'],
      select: false,
    },
    googleId: {
      type: String,
    },
    avatar: {
      type: String,
    },
    provider: {
      type: String,
      enum: ['local', 'google'],
      default: 'local',
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving to database
UserSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
