const mongoose = require('mongoose');

//* Define the post schema
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title required'],
    },
    image: {
      type: String,
      default: '',
    },
    claps: {
      type: Number,
      default: 0,
    },
    content: {
      type: String,
      required: [true, 'Content required'],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Author required'],
      ref: 'User',
    },
    shares: {
      type: Number,
      default: 0,
    },
    postViews: {
      type: Number,
      default: 0,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Category required'],
      ref: 'Category',
    },
    scheduledForPublish: {
      type: Date,
      default: null,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  },
  {
    timestamps: true,
    strictQuery: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

//* Define the Post model
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
