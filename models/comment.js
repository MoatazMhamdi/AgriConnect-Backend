import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  commentText: {
    type: String,
    required: false,
  },
  isLiked: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  blog: { // Ajout de la référence à l'ID du blog
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;