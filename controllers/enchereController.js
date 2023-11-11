import Enchere from "../models/enchere.js";
import Equipment from "../models/equipment.js";
import { validationResult } from 'express-validator';
// Créer une nouvelle enchère
export const createEnchere = async (req, res) => {
    try {
        const newEnchere = new Enchere(req.body);
        const savedEnchere = await newEnchere.save();
        res.status(201).json(savedEnchere);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtenir toutes les enchères
export const getAllEncheres = async (req, res) => {
    try {
        const encheres = await Enchere.find({});
        res.status(200).json(encheres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtenir une enchère par ID
export const getEnchereById = async (req, res) => {
    try {
        const enchere = await Enchere.findById(req.params.id);
        if (!enchere) {
            return res.status(404).json({ message: "Enchère non trouvée" });
        }
        res.status(200).json(enchere);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour une enchère par ID
export const updateEnchere = async (req, res) => {
    try {
        const updatedEnchere = await Enchere.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEnchere) {
            return res.status(404).json({ message: "Enchère non trouvée" });
        }
        res.status(200).json(updatedEnchere);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer une enchère par ID
export const deleteEnchere = async (req, res) => {
    try {
        const deletedEnchere = await Enchere.findByIdAndDelete(req.params.id);
        if (!deletedEnchere) {
            return res.status(404).json({ message: "Enchère non trouvée" });
        }
        res.status(200).json({ message: "Enchère supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
