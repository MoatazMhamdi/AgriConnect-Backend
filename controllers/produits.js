import produits from "../models/produits.js";

import { validationResult } from 'express-validator';

// Add a new product
export const createProduit = async (req, res) => {
try {
   const newProduit= new produits({...req.body})
   await newProduit.save();
   res.status(200).json(newProduit);
    
} catch (error) {
    res.status(400).json({ errors:error.message });
}
 
     
  
}

// Get a product by its ID
export async function getProduit(req, res) {
    const {_id} = req.params;
    try {
       const foundProduit = await produits.findById({_id:_id});
       if(!foundProduit)
       res.status(400).send({errors:[{msg:"Produit n'existe pas"}]});
   
       res.status(200).send({success:{msg:"Produit trouvée",foundProduit}});
       
    } catch (error) {
       res.status(400).send({errors:[{msg:error.message}]});
    }
}

// Update a product
export async function updateProduit(req, res) {
    const {id} = req.params;

    try {
     const newProduit = req.body
     await produits.updateOne({_id:id} , {$set:newProduit});
     res.status(200).send({success:{msg:"produit modifié avec succes",newProduit}});
  
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

// Get a list of all products
export async function getProduits(req, res) {
    try {
        const Produits = await produits.find();
        res.status(200).json(Produits);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

//delete an order
  export async function deleteProduit(req, res) {
    try { 
    const deletedProduit = await produits.findByIdAndDelete({_id:req.params.id})
    deletedProduit ?
     res.status(200).send({success:{msg:"Produit supprimée avec succes",deletedProduit}})
     :
     res.status(404).json({errors:{message:'Suppression echoué'}})

     } catch (error) {
      res.status(400).json({ error: error.message });
    }
  
  }
