// models/echange.j
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const EchangeSchema = new Schema({
  // Define the schema fields for the "Échanges" table
  utilisateur: {
    type: Schema.Types.ObjectId,
    ref: "Utilisateur", // Reference to the "Utilisateur" model (if you have one)
    required: true,
  },
  produitPropose: {
    type: Schema.Types.ObjectId,
    ref: "Produit", // Reference to the "Produit" model
    required: true,
  },
  quantiteProposee: {
    type: Number,
    required: true,
  },
  description: String,
  dateEchange: {
    type: Date,
    required: true,}
},

{timestamps: true});;

export default model("Echange", EchangeSchema);
