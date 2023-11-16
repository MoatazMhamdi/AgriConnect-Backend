import mongoose from 'mongoose'; // Importer Mongoose
const { Schema, model } = mongoose; // Utiliser Schema et model du module mongoose
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: false },
    password: { type: String, required: true },
    numTel: { type: Number, required: true ,unique:true },
   
    picture: { type: String, required : false },
    role: { type: String, enum: ['Farmer', 'Client', 'AdminSup'], required: true },   
  });

  const User = mongoose.model('User', userSchema);
export default model("user",userSchema);

