import express from 'express';
import * as commentController from '../controllers/comment.js';

const router = express.Router();

// Créer un nouveau commentaire
router.post('/', commentController.createComment);

// Récupérer tous les commentaires
router.get('/:blogId', commentController.getCommentById);

// Mettre à jour un commentaire
router.put('/comments/:commentId', commentController.updateComment);

// Supprimer un commentaire
router.delete('/comments/:commentId', commentController.deleteComment);

export default router;
