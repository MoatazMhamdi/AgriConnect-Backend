import express from "express";

import {
    createCommande,
    getCommandes,
    updateCommande,
    deleteCommande,
    getOneCommande,
  } from "../controllers/commandeController.js";

const router = express.Router();

// Routes for "Commandes" resource
router.post("/commandes", createCommande);
router.get("/commande/:_id" , getOneCommande);
router.get("/commandes", getCommandes);
router.put("/commandes/:id", updateCommande);
router.delete("/commandes/:id", deleteCommande);

export default router;