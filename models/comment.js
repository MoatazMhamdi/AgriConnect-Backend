// models/comment.js

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const CommentSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  blog: {
    type: Schema.Types.ObjectId,
    ref: 'Blog',
    required: true
  },
},
{
  timestamps: true
});

export default model('Comment', CommentSchema);
