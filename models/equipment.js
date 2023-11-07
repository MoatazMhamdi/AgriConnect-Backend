import e from "express";
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const equipmentSchema = new Schema({
    nom: {
        type: String,
        required: true,
    },

    paysOrigine: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true,
    });

export default model("Equipment", equipmentSchema);