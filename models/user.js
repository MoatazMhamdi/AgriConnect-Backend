import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({


  
  name: {
    type: String,
    required: true,
  },

  numTel: {
    type: String,
    required: true,
    unique: true, // Assure que chaque numéro de téléphone est unique
  },

  // Ajoutez d'autres champs au besoin

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
