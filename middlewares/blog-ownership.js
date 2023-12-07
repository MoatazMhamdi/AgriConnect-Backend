import express from 'express';
import mongoose from 'mongoose';
import blog from "../models/blog.js";
import { body, validationResult } from 'express-validator';

// Assurez-vous d'avoir initialisé et configuré votre application Express et Mongoose.

// Middleware pour vérifier l'autorisation de mise à jour du blog
export async function checkBlogOwnership(req, res, next) {
    try {
        const userId = req.user.id;

        const existingblog = await blog.findById(req.params.id);

        if (!existingblog) {
            return res.status(404).json({ message: 'blog not found' });
        }

        // Vérifiez si le blog appartient à l'utilisateur connecté
        if (existingblog.owner !== userId) {
            return res.status(403).json({ message: "Vous n'êtes pas autorisé à modifier ce blog." });
        }

        // Validation pour le champ "titre"
        await body('titre').isLength({ min: 8, max: 100 }).run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Si l'utilisateur est autorisé et la validation passe, passez à la route de mise à jour du blog
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Appliquez le middleware à la route de mise à jour du blog