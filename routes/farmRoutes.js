import express from "express";

import {
    createFarm,
    updateFarm,
    deleteFarm,
    getOneFarm,
    getFarm,
  } from "../controllers/farmController.js";

const router = express.Router();

// Routes for "farms" resource
router.post("/farm", createFarm);
router.get("/farm/:_id" , getOneFarm);
router.get("/farm", getFarm);
router.put("/farm/:id", updateFarm);
router.delete("/farm/:id", deleteFarm);

export default router;