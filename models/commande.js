import mongoose from "mongoose";

const { Schema, model } = mongoose;

const CommandeSchema = new Schema({
  // Define the schema fields for the "Commandes" table
  produit: {
    type: Schema.Types.ObjectId,
    ref: "Produit", // Reference to the "Produit" model
    required: false,
  },
  utilisateur: {
    type: Schema.Types.ObjectId,
    ref: "Utilisateur", // Reference to the "Utilisateur" model (if you have one)
    required: false,
  },
  quantiteCommandee: {
    type: Number,
    required: true,
  },
  statut: {
    type: String,
    enum: ["en attente", "expédiée", "livrée", "annulée"],
    required: true,
  },
  dateCommande: {
    type: Date,
    required: true,
  },

});

export default model("Commande", CommandeSchema);
