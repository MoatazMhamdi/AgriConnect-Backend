import panier from "../models/panier.js";
import Panier from "../models/panier.js";
import produits from "../models/produits.js";
// Add a product to the shopping cart
export async function addToPanier(req, res) {
    try {
        const newPanier = new Panier({...req.body});
        await newPanier.save();
        res.status(201).send({success:{msg:"Panier crée avec succes",newPanier}});
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
} 

// Get shopping cart items for a specific user
export async function getPanierItems(req, res) {
    try {
      const { utilisateurId } = req.params;
      const panierItems = await Panier.find({ utilisateur: utilisateurId }).populate('produit');
      res.status(200).json(panierItems);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

// Update a shopping cart item by ID
export async function updatePanierItem(req, res) {
  try {
    const { id } = req.params;
    const existingPanierItem = await Panier.findById(id);

    if (!existingPanierItem) {
      return res.status(404).json({ message: 'Shopping cart item not found' });
    }

    if (req.body.utilisateur) {
      existingPanierItem.utilisateur = req.body.utilisateur;
    }
    if (req.body.produit) {
      existingPanierItem.produit = req.body.produit;
    }
    if (req.body.quantite) {
      existingPanierItem.quantite = req.body.quantite;
    }

    const updatedPanierItem = await existingPanierItem.save();
    res.status(200).json({ updatedPanierItem: updatedPanierItem });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Remove a shopping cart item by ID
export async function removeFromPanier(req, res) {
  try {
    const { id } = req.params;
    await Panier.findByIdAndRemove(id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}