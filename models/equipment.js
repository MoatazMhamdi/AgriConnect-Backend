import mongoose from "mongoose";

const { Schema, model } = mongoose;

const equipmentSchema = new Schema({
  
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  categorie: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
},
{
  timestamps: true,
});

export default model("Equipment", equipmentSchema);
