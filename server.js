import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from './routes/userRoutes.js';
import equipmentRoutes from "./routes/equipmentRoutes.js";
import maintenanceRoutes from "./routes/mainteanceRoutes.js";
import enchereRoutes from "./routes/enchereRoutes.js";
import blogRoutes from './routes/blogRoutes.js';
import reclamationRoutes from './routes/reclamationRoutes.js';
import commandeRoutes from './routes/commandeRoutes.js';
import produitRoutes from './routes/produitsRoutes.js';
import panierRoutes from './routes/panierRoutes.js';
import farmRoutes from './routes/farmRoutes.js';
import commentRoutes from './routes/comment.js'; // Assurez-vous que le chemin est correct

import { notFoundError, errorHandler } from "./middlewares/error-handler.js";

const app = express();
const PORT = process.env.PORT || 9090;
const databaseName = 'AgriConnect';
const db_url = 'mongodb://127.0.0.1:27017';

mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://127.0.0.1:27017/${databaseName}`)
  .then(() => console.log(`Connected to ${databaseName}`))
  .catch(err => console.log(err));

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/equipments', equipmentRoutes);
app.use('/maintenances', maintenanceRoutes);
app.use('/encheres', enchereRoutes);
app.use('/blog', blogRoutes);
app.use('/api', blogRoutes);
app.use('/reclamation', reclamationRoutes);
app.use('/commandes', commandeRoutes);
app.use('/produits', produitRoutes);
app.use('/panier', panierRoutes);
app.use('/farm', farmRoutes);
app.use('/comments', commentRoutes);


app.use('/images', express.static('images'));


app.get("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: "1" })
  res.status(201).json({ message: 'successfully logged out' })
});

app.use(notFoundError);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
