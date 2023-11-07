import express from "express";
import { createEquipment, getAll, getOne } from "../controllers/equipmentController.js";
import { body } from "express-validator";

const router = express.Router();

/**
 * declaration des routes equipment
 */
router
    .route("/")
    .post(
        body("nom").isLength({ min: 3, max: 30 }),
        body("paysOrigine").isLength({ min: 3, max: 30 }),
        createEquipment)
    .get(getAll);

router
    .route("/:id")
    .get(getOne);

/**
 * export du router
 */
export default router;
