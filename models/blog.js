// models/blog.js

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const BlogSchema = new Schema({
    titre: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    lieu: {
        type: String,
        required: true
    },
    image: {
        type: String,

    },
    date: {
        type: Date,
        required: true
    },
    prix: {
        type: Number,
        required: true
    },
    jAime: {
        type: Number,
        default: 0
    },
    sauvegarde: {
        type: Number, // Ajout de l'attribut "save"
        default: 0
    },
    dislike: {
        type: Number, // Ajout de l'attribut "dislike"
        default: 0
    },
    
},
{
    timestamps: true
});

export default model('Blog', BlogSchema);
