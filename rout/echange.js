import express from "express";
import {
  createEchange,
  getEchange,
  getEchanges,
  updateEchange,
  deleteEchange,
} from "../controllers/echange.js";

const router = express.Router();

// Routes for "Échanges" resource
router.post("/echange", createEchange);
router.get("/echange/:_id", getEchange); //get one exchange
router.get("/echange",getEchanges) //get all exchanges
router.put("/echange/:id", updateEchange);
router.delete("/echange/:id", deleteEchange);

export default router;
