import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const enchereSchema = new Schema({
  ID_Equipement: {
    type: Schema.Types.ObjectId,
    ref: 'Equipment',
    required: true
  },
  Date_Debut: {
    type: Date,
    required: true
  },
  Date_Fin: {
    type: Date,
    required: true
  },
  Prix_Depart: {
    type: Number,
    required: true
  },
  Prix_Actuel: {
    type: Number,
    required: true
  },
  Statut_Enchere: {
    type: String,
    required: true,
    enum: ['active', 'terminée', 'suspendue', 'en attente'] 
  }
});

const Enchere = model('Enchere', enchereSchema);

export default Enchere;
