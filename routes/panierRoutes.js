import express from "express";
import {
  addToPanier,
  getPanierItems,
  updatePanierItem,
  removeFromPanier,
} from "../controllers/panierController.js";

const router = express.Router();

// Routes for "Panier" resource
router.post("/panier", addToPanier);
router.get("/panier/:utilisateurId", getPanierItems);
router.put("/panier/:id", updatePanierItem);
router.delete("/panier/:id", removeFromPanier);

export default router;