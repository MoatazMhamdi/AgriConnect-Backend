import express from 'express';
import mongoose from 'mongoose';
import reclamation from '../models/reclamation.js'; // Assurez-vous d'importer le modèle de réclamation approprié

// Middleware pour vérifier l'autorisation de mise à jour de la réclamation
export async function checkReclamationOwnership(req, res, next) {
    try {
        const userId = req.user.id; // Vous devrez adapter ceci en fonction de la façon dont vous stockez l'ID de l'utilisateur connecté.

        const existingReclamation = await reclamation.findById(req.params.id);

        if (!existingReclamation) {
            return res.status(404).json({ message: 'Réclamation non trouvée' });
        }

        // Vérifiez si la réclamation appartient à l'utilisateur connecté
        if (existingReclamation.user !== userId) {
            return res.status(403).json({ message: "Vous n'êtes pas autorisé à accéder à cette réclamation." });
        }

        // Si l'utilisateur est autorisé, passez à la route de mise à jour de la réclamation
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
