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
export async function deleteCommande(req, res) {
    try {
       const existingCommande = await Commande.findById(req.params.id);
     
       if (!existingCommande) {
         return res.status(404).json({ message: 'command not found' });
       }
       const twoDaysInMillis = 2 * 24 * 60 * 60 * 1000; // Two days in milliseconds
       const currentTime = new Date().getTime();
       const commandeTime = existingCommande.createdAt.getTime();

       if(currentTime-commandeTime >twoDaysInMillis)
       return res.status(400).send({ message: 'Désolé, la commande ne peut pas être annulée! Les 2 jours sont passés' });
      
     const deletedCommand = await Commande.findByIdAndDelete({_id:req.params.id})
     deletedCommand ?
     res.status(200).send({success:{msg:"commande supprimée avec succes",deletedCommand}})
     :
     res.status(404).json({errors:{message:'Suppression echoué'}})


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
