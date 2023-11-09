import express from "express";
import { createEquipment, getAll, getOne } from "../controllers/equipmentController.js";
import { body } from "express-validator";

const router = express.Router();

/**
 * Declaration of equipment routes
 */
router
    .route("/")
    .post(
        body("name").isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
        body("image").isURL().withMessage('Image must be a valid URL'),
        body("categorie").isLength({ min: 3 }).withMessage('Categorie must be at least 3 characters long'),
        body("description").isLength({ min: 5 }).withMessage('Description must be at least 5 characters long'),
        createEquipment
    )
    .get(getAll);

router
    .route("/:id")
    .get(getOne);

/**
 * Export the router
 */
export default router;
