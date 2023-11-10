import mongoose from 'mongoose';

const { Schema } = mongoose;

const FarmSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Utilisateur', // Reference to the "Utilisateur" model
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
});

const Farm = mongoose.model('Farm', FarmSchema);

export default Farm;
