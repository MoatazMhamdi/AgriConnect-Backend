import express from 'express';
import * as reclamationController from '../controllers/reclamationController.js';
import { addReclamation, deleteReclamation } from '../controllers/reclamationController.js';

const router = express.Router();

router.route('/')
  .post(addReclamation)
  .get(reclamationController.getAllReclamations);
  router.route('/delete/:id')
  .delete(deleteReclamation)
  .get(reclamationController.deleteReclamation);

router.route('/:id')
  .get(reclamationController.getReclamation)
  .delete(reclamationController.deleteReclamation);

export default router;