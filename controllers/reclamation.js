import Reclamation from '../models/reclamation.js';
import { validationResult } from 'express-validator';
import User from '../models/user.js';


// Ajouter une réclamation
export async function addReclamation(req, res) {
  try {
    const { service, objet, description } = req.body;
    const newReclamation = await Reclamation.create({
      service,
      objet,
      description,
    });
    res.status(200).json(newReclamation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Obtenir une réclamation par ID
export async function getReclamation(req, res) {
  try {
    const reclamationId = req.params.id;
    const reclamation = await Reclamation.findById(reclamationId);
    if (reclamation) {
      res.status(200).json(reclamation);
    } else {
      res.status(404).json({ message: 'Réclamation non trouvée' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Obtenir toutes les réclamations
export async function getAllReclamations(req, res) {
  try {
    const reclamations = await Reclamation.find().populate('user');
    res.status(200).json(reclamations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Supprimer une réclamation
export async function deleteReclamation(req, res) {
  try {
    const reclamationId = req.params.id;
    const reclamation = await Reclamation.findById(reclamationId);
    if (!reclamation) {
      return res.status(404).json({ message: 'Réclamation non trouvée' });
    }
    await Reclamation.deleteOne({ _id: reclamationId });

    res.status(200).json({ message: 'Réclamation supprimée avec succès' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}