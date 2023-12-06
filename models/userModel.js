const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

//* Define the user schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username required'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Email required'],
      validate: [validator.isEmail, 'Please provide a valid email'],
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['user', 'admin'],
      default: 'user',
    },
    password: {
      type: String,
      required: [true, 'Password required'],
      minlength: 3,
      select: false,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    accountLevel: {
      type: String,
      enum: ['gold', 'silver', 'bronze'],
      default: 'bronze',
    },
    profilePicture: {
      type: String,
      default: '',
    },
    coverImage: {
      type: String,
      default: '',
    },
    bio: String,
    location: String,
    notificationPreferences: {
      email: { type: Boolean, default: true },
      // other notification preferences (sms)
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    profileViewers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    passwordResetToken: String,
    passwordResetExpires: Date,
    accountVerificationToken: String,
    accountVerificationExpires: Date,
  },
  {
    timestamps: true,
    strictQuery: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

//* using mongoose document middleware to hash the password before saving
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

//* Define the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
