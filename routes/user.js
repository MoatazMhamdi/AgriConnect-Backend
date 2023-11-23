import express from 'express';
import { createUser, getAllUsers } from '../controllers/user.js';
const router = express.Router();

// Route pour créer un nouvel utilisateur
router.post('/', createUser);
// Route pour récupérer tous les utilisateurs
router.get('/users', getAllUsers);

export default router;
