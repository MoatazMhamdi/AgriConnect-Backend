import Echange from "../models/echange.js"; // Import your "Echange" model
import { validationResult } from 'express-validator';

// Create a new exchange
export function createEchange(req, res) {
  if (!validationResult(req).isEmpty()) {
    res.status(400).json({ errors: validationResult(req).array() });
  } else {
    Echange.create({
      utilisateur: req.body.utilisateur,
      produitPropose: req.body.produitPropose,
      quantiteProposee: req.body.quantiteProposee,
      description: req.body.description,
      dateEchange: req.body.dateEchange,
    })
      .then((newEchange) => {
        res.status(200).json(newEchange);
      })
      .catch((error) => res.status(400).json({ error }));
  }
}

// Get an exchange by its ID
export async function getEchange(req, res) {
  try {
    const echange = await Echange.findById(req.params.id);
    if (!echange) {
      return res.status(404).json({ message: 'Exchange not found' });
    }
    res.status(200).json(echange);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Update an exchange by ID
export async function updateEchange(req, res) {
  try {
    const { id } = req.params;
    const existingEchange = await Echange.findById(id);

    if (!existingEchange) {
      return res.status(404).json({ message: 'Exchange not found' });
    }

    if (req.body.utilisateur) {
      existingEchange.utilisateur = req.body.utilisateur;
    }
    if (req.body.produitPropose) {
      existingEchange.produitPropose = req.body.produitPropose;
    }
    if (req.body.quantiteProposee) {
      existingEchange.quantiteProposee = req.body.quantiteProposee;
    }
    if (req.body.description) {
      existingEchange.description = req.body.description;
    }
    if (req.body.dateEchange) {
      existingEchange.dateEchange = req.body.dateEchange;
    }

    const updatedEchange = await existingEchange.save();
    res.status(200).json({ updatedEchange: updatedEchange });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Delete an exchange by ID within the first 2 days
export async function deleteEchange(req, res) {
    try {
      const { id } = req.params;
      const existingEchange = await Echange.findById(id);
  
      if (!existingEchange) {
        return res.status(404).json({ message: 'Exchange not found' });
      }
  
      const twoDaysInMillis = 2 * 24 * 60 * 60 * 1000; // Two days in milliseconds
      const currentTime = new Date().getTime();
      const exchangeTime = existingEchange.dateEchange.getTime();
  
      if (currentTime - exchangeTime > twoDaysInMillis) {
        return res.status(400).json({ message: 'Désolé, la commande ne peut pas être annulée! Les 2 jours sont passés' });
      }
  
      await Echange.findByIdAndRemove(id);
      res.status(204).end();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }  

// Get a list of all exchanges
export async function getEchanges(req, res) {
  try {
    const echanges = await Echange.find();
    res.status(200).json(echanges);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
