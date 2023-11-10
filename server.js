import express from 'express';
import mongoose from 'mongoose';

const hostname = '127.0.0.1';
const app = express();
const port = process.env.port || 3000;
const databaseName = 'AgriConnect';

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
  .connect(`mongodb://127.0.0.1:27017/${databaseName}`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });

app.use(express.json());

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// Use import syntax for routes instead of require
import commandeRoutes from './rout/commande.js';
import produitRoutes from './rout/produits.js';
import echangeRoutes from './rout/echange.js';
import panierRoutes from './rout/panier.js';
import farmRoutes from './rout/farm.js';
// Use app.use with imported route
app.use('/api/commandes', commandeRoutes);
app.use('/api/produits' , produitRoutes);
app.use('/api/echange',echangeRoutes);
app.use('/api/panier',panierRoutes);
app.use('/api/farm',farmRoutes);