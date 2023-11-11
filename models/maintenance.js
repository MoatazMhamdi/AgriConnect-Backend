import mongoose from "mongoose";

const { Schema, model } = mongoose;

const maintenanceSchema = new Schema({
  ID_Equipement: {
    type: Schema.Types.ObjectId,
    ref: 'Equipment',
    required: true
  },
  Date_Maintenance: {
    type: Date,
    required: true
  },
  Type_Maintenance: {
    type: String,
    required: true,
    enum: ['préventive', 'corrective', 'autre'] // Exemple de types de maintenance
  },
  Description: {
    type: String,
    required: true
  },
  Coût_Maintenance: {
    type: Number,
    required: true
  },
});

const Maintenance = model("Maintenance", maintenanceSchema);

export default Maintenance;
