import express from "express";

import {
  createProduit,
  getProduits,
  getProduit,
  updateProduit,
  deleteProduit,
} from "../controllers/produits.js";

const router = express.Router();

// Routes for "Produits" resource
router.post("/produits", createProduit);
router.get("/produits", getProduits);
router.put("/produits/:id", updateProduit);
router.delete("/produits/:id", deleteProduit);
router.get("/produits/:_id",getProduit);

export default router;
