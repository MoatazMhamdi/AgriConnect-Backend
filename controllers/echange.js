import echange from "../models/echange.js";
import Echange from "../models/echange.js"; // Import your "Echange" model
import { validationResult } from 'express-validator';

// Create a new exchange
export async function createEchange(req, res) {
        try {
            const newechange = new Echange({...req.body});
            await newechange.save();
            res.status(201).send({success:{msg:"echange crée avec succes",newechange}});
          } catch (err) {
            res.status(400).json({ error: err.message });
          }
    } 


// Get an exchange by its ID
export async function getEchange(req, res) {
    const {_id} = req.params;
    try {
       const foundechange = await Echange.findById({_id:_id});
       if(!foundechange)
       res.status(400).send({errors:[{msg:"Commande n'existe pas"}]});
   
       res.status(200).send({success:{msg:"commande trouvée",foundechange}});
       
    } catch (error) {
       res.status(400).send({errors:[{msg:error.message}]});
   
    }
}

// Update an exchange by ID
export async function updateEchange(req, res) {
    const {id} = req.params;

    try {
     const newechange = req.body
     await Echange.updateOne({_id:id} , {$set:newechange});
     res.status(200).send({success:{msg:"echange modifié avec succes",newechange}});
  
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

// Delete an exchange by ID within the first 2 days
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
        return res.status(400).json({ message: 'Désolé, l echange ne peut pas être annulée! Les 2 jours sont passés' });
      }
  
      await Echange.findByIdAndRemove(id);
      res.status(204).end();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
 
 // Get a list of all orders
 export async function getEchanges(req, res) {
    try {
        const echange = await Echange.find();
        res.status(200).json(echange);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

