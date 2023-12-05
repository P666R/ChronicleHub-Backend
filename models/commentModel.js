const mongoose = require('mongoose');

//* Define the user schema
const commentSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
  },
  {
    timestamps: true,
    strictQuery: true,
  },
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
