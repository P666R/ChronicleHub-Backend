const mongoose = require('mongoose');
const validator = require('validator');

//* Define the user schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username required'],
    },
    email: {
      type: String,
      required: [true, 'Email required'],
      validate: [validator.isEmail, 'Please provide a valid email'],
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

//* Define the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
