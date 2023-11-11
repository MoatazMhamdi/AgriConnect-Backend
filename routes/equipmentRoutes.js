import express from "express";
import { createEquipment, getAll, getOne, deleteEquipment, updateEquipment } from "../controllers/equipmentController.js";

import { body } from "express-validator";

const router = express.Router();

/**
 * Déclaration des routes d'équipement
 */
router
  .route("/")
  .post(
      body("name").isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
      body("image").isURL().withMessage('Image must be a valid URL'),
      body("categorie").isLength({ min: 3 }).withMessage('Categorie must be at least 3 characters long'),
      body("description").isLength({ min: 5 }).withMessage('Description must be at least 5 characters long'),
      createEquipment
  )
  .get(getAll);

// Route pour obtenir un équipement par ID
router.get('/:id', getOne);

// Route DELETE pour supprimer un équipement par ID
router.delete('/:id', deleteEquipment);

// Route PUT pour mettre à jour un équipement par ID
router.put('/:id', updateEquipment);

/**
 * Exporter le routeur
 */
export default router;
