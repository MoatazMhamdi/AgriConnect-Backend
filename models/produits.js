import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ProduitSchema = new Schema({
  // Define the schema fields for the "Produits" table
  nom: {
    type: String,
    required: true,
  },
  photo: String,
  description: String,
  prix: {
    type: Number,
  },
  quantiteEnStock: {
    type: Number,
    required: true,
  },
  dateRecolte: Date,
  proprietaire: {
    type: Schema.Types.ObjectId,
    ref: "Ferme", // Reference to the "Ferme" model 
  },
},
{timestamps: true});

export default model("Produits", ProduitSchema);
