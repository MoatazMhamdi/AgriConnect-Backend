import express from 'express';
import {
  createComment,
  getAllComments,
  updateComment,
  deleteComment,
} from '../controllers/commentController';

const router = express.Router();

// Route pour créer un nouveau commentaire
router.post('/comments', createComment);

// Route pour récupérer tous les commentaires
router.get('/comments', getAllComments);

// Route pour mettre à jour un commentaire
router.put('/comments/:commentId', updateComment);

// Route pour supprimer un commentaire
router.delete('/comments/:commentId', deleteComment);

export default router;
