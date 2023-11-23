import express from 'express';
import {
  createMaintenance,
  getMaintenanceById,
  updateMaintenance,
  deleteMaintenance,
  getAllMaintenanceRecords,
  getMaintenanceByEquipmentId
} from '../controllers/maintenanceController.js'; // Ajustez le chemin si nécessaire

const router = express.Router();

// Route pour créer un nouvel enregistrement de maintenance
router.post('/', createMaintenance);

// Route pour obtenir tous les enregistrements de maintenance
router.get('/', getAllMaintenanceRecords);

router.get('/equipments/:equipmentId', getMaintenanceByEquipmentId);

// Routes pour obtenir, mettre à jour et supprimer un enregistrement de maintenance par ID
router
  .route('/:id')
  .get(getMaintenanceById)
  .put(updateMaintenance)
  .delete(deleteMaintenance);

export default router;
