import Comment from '../models/comment.js';
import Blog from '../models/blog.js';
import mongoose from 'mongoose';


// Contrôleur pour créer un nouveau commentaire
export const createComment = async (req, res) => {
  try {
    const { text, blogId } = req.body;

    const newComment = new Comment({
      text,
      blog: blogId,
    });

    const savedComment = await newComment.save();

    // Ajoutez l'ID du commentaire au tableau de commentaires du blog
    await Blog.findByIdAndUpdate(blogId, { $push: { comments: savedComment._id } }, { new: true });

    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to retrieve all comments for a blog
export const getCommentById = async (req, res) => {
  try {
    const { blogId } = req.params;
    console.log('Received blogId:', blogId);

    // Ensure that blogId is a valid ObjectId in the expected format
    if (!mongoose.isValidObjectId(blogId)) {
      return res.status(400).json({ error: 'Invalid blogId format' });
    }

    // Find all comments where the blogId attribute matches the specified blogId
    const comments = await Comment.find({ 'blog': blogId });
    res.status(200).json(comments);
    console.log(comments)
  } catch (error) {
    console.error('Error fetching comments by blog ID:', error);
    res.status(500).json({ error: error.message });
  }
};


// Contrôleur pour mettre à jour le commentaire
export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { text },
      { new: true }
    );

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Contrôleur pour supprimer un commentaire
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const deletedComment = await Comment.findByIdAndDelete(commentId);

    // Retirez l'ID du commentaire du tableau de commentaires du blog
    const blog = await Blog.findOneAndUpdate(
      { comments: commentId },
      { $pull: { comments: commentId } },
      { new: true }
    );

    res.status(200).json(deletedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
