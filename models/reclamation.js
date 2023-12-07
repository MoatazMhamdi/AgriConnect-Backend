import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const ReclamationSchema = new Schema({
  service: {
    type: String,
    required: true
  },
  objet: {
    type: String
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default model('Reclamation', ReclamationSchema);