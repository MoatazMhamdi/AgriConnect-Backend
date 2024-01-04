import express from "express";
import { createEquipment, getAll, getOne, deleteEquipment, updateEquipment, getEquipmentByUserId } from "../controllers/equipmentController.js";
import path from 'path';

import { body } from "express-validator";
import multer from 'multer';

// Configuration de stockage pour les fichiers téléchargés
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/'); // Chemin où les fichiers seront stockés
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });
const router = express.Router();

/**
 * Déclaration des routes d'équipement
 */
router.post(
  '/',
  upload.single('image'), 
  body("name").isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
  body("categorie").isLength({ min: 3 }).withMessage('Categorie must be at least 3 characters long'),
  body("description").isLength({ min: 5 }).withMessage('Description must be at least 5 characters long'),
  body("etat").isLength({ min: 3 }).withMessage('Etat must be at least 5 characters long'),
  createEquipment
);

  router.get('/', getAll);

// Route pour obtenir un équipement par ID
router.get('/:id', getOne);

// Route DELETE pour supprimer un équipement par ID
router.delete('/:id', deleteEquipment);

// Route PUT pour mettre à jour un équipement par ID
router.put('/:id',
upload.single('image'),  
updateEquipment);


router.put('/sansImage/:id', 
updateEquipment);


router.get('/user/:userId', getEquipmentByUserId);

/**
 * Exporter le routeur
 */
export default router;
