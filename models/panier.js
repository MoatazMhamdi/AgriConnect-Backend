import mongoose from "mongoose";
import produits from "../models/produits.js";
const { Schema, model } = mongoose;

const PanierSchema = new Schema({
  // Define the schema fields for the "Panier" table
  utilisateur: {
    type: Schema.Types.ObjectId,
    ref: "Utilisateur", // Reference to the "Utilisateur" model 
    required: true,
  },
  produit: {
    type: Schema.Types.ObjectId,
    ref: "Produit", // Reference to the "Produit" model
    required: true,
  },
  quantite: {
    type: Number,
    required: true,
  },
});

export default model("Panier", PanierSchema);