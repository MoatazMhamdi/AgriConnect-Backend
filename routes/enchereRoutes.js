import express from 'express';
import {
  createEnchere,
  getAllEncheres,
  getEnchereById,
  updateEnchere,
  deleteEnchere
} from '../controllers/enchereController.js'; // Ajustez le chemin si nécessaire

const router = express.Router();

// Route pour créer une nouvelle enchère
router.post('/', createEnchere);

// Route pour obtenir toutes les enchères
router.get('/', getAllEncheres);

// Routes pour obtenir, mettre à jour, et supprimer une enchère par ID
router
  .route('/:id')
  .get(getEnchereById)
  .put(updateEnchere)
  .delete(deleteEnchere);

export default router;
