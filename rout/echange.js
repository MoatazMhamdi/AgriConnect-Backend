import express from "express";
import {
  createEchange,
  getEchanges,
  updateEchange,
  deleteEchange,
} from "../controllers/echange.js";

const router = express.Router();

// Routes for "Échanges" resource
router.post("/echanges", createEchange);
router.get("/echanges", getEchanges);
router.put("/echanges/:id", updateEchange);
router.delete("/echanges/:id", deleteEchange);

export default router;
