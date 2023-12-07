import Commande from "../models/commande.js";

import { validationResult } from 'express-validator';

// Create a new order
export const createCommande = async (req , res) => {
    try {
        const newCommand = new Commande({...req.body});
        await newCommand.save();
        res.status(201).send({success:{msg:"commande crée avec succes",newCommand}});
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
} 

// Get an order by its ID
export async function getOneCommande(req, res) {
 const {_id} = req.params;
 try {
    const foundCommand = await Commande.findById({_id:_id});
    if(!foundCommand)
    res.status(400).send({errors:[{msg:"Commande n'existe pas"}]});

    res.status(200).send({success:{msg:"commande trouvée",foundCommand}});
    
 } catch (error) {
    res.status(400).send({errors:[{msg:error.message}]});

 }
}

// Update an order
export async function updateCommande(req, res) {
    const {id} = req.params;

  try {
   const newCommand = req.body
   await Commande.updateOne({_id:id} , {$set:newCommand});
   res.status(200).send({success:{msg:"commande modifié avec succes",newCommand}});

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

//delete an order
// Delete an exchange by ID within the first 2 days
export async function deleteCommande(req, res) {
  try {
    const { id } = req.params;
    const existingCommande = await Commande.findById(id);

    if (!existingCommande) {
      return res.status(404).json({ message: 'commande not found' });
    }

    const twoDaysInMillis = 2 * 24 * 60 * 60 * 1000; // Two days in milliseconds
    const currentTime = new Date().getTime();
    const CommandeTime = existingCommande.dateCommande.getTime();

    if (currentTime - CommandeTime > twoDaysInMillis) {
      return res.status(400).json({ message: 'Désolé, la commande ne peut pas être annulée! Les 2 jours sont passés' });
    }

    await Commande.findByIdAndRemove(id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


// Get a list of all orders
export async function getCommandes(req, res) {
  try {
    const commandes = await Commande.find();
    res.status(200).json(commandes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}