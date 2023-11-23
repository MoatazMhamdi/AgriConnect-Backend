import Comment from '../models/comment';

// Contrôleur pour créer un nouveau commentaire
export const createComment = async (req, res) => {
  try {
    const { username, commentText } = req.body;
    const userId = req.user.id; // Supposons que vous avez un middleware d'authentification qui ajoute l'utilisateur à la demande

    const newComment = new Comment({
      username,
      commentText,
      user: userId,
    });

    const savedComment = await newComment.save();

    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Contrôleur pour récupérer tous les commentaires
export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate('user', 'name'); // Utilisez populate pour récupérer les détails de l'utilisateur
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Contrôleur pour mettre à jour le commentaire
export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { commentText } = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { commentText },
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

    res.status(200).json(deletedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
