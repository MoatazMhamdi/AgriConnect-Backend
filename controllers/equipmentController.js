import Equipment from "../models/equipment.js";
import { validationResult } from 'express-validator';
import { deleteOldImage } from '../utils/imageUtils.js'



/**
 * Adding a piece of equipment
 * @param {*} req 
 * @param {*} res 
 * @returns equipment object
 */

export function createEquipment(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, categorie, description, etat, userId } = req.body;
    const image = req.file.path; // Chemin du fichier téléchargé
   

    try {
        Equipment.create({
            name,
            image,
            categorie,
            description,
            etat,
            userId
        })
        .then(newEquipment => {
            res.status(201).json(newEquipment);
        })
        .catch(err => {
            console.error("Erreur lors de la création de l'équipement:", err);
            res.status(500).json({ error: err.message });
        });
    } catch (error) {
        console.error("Erreur lors de la création de l'équipement:", error);
        res.status(500).json({ error: error.message });
    }
}


/**
 * Displaying all pieces of equipment
 * @param {*} req 
 * @param {*} res 
 */
export function getAll(req, res) {
    Equipment.find({})
        .then(equipments => {
            res.status(200).json(equipments);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}

/**
 * Displaying a piece of equipment by its ID
 * @param {*} req 
 * @param {*} res 
 */
export function getOne(req, res) {
    Equipment.findById(req.params.id)
        .then(equipment => {
            if (!equipment) {
                return res.status(404).json({ error: "Equipment not found" });
            }
            res.status(200).json(equipment);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}
/**
 * Deleting a piece of equipment by its ID
 * @param {*} req 
 * @param {*} res 
 */
export function deleteEquipment(req, res) {
    Equipment.findByIdAndDelete(req.params.id)
        .then(deletedEquipment => {
            if (!deletedEquipment) {
                return res.status(404).json({ error: "Equipment not found" });
            }
            res.status(200).json({ message: "Equipment successfully deleted" });
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}


/**
 * Updating a piece of equipment by its ID
 * @param {*} req 
 * @param {*} res 
 * @returns updated equipment object
 */
export function updateEquipment(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, categorie, description, etat, userId } = req.body;

    const updateFields = {
        name,
        categorie,
        description,
        etat,
        userId  // Include userId if you want to update it
    };

    // Vérifiez si une nouvelle image a été fournie
    if (req.file) {
        updateFields.image = req.file.path; // Mettez à jour le chemin de la nouvelle image
    }

    Equipment.findById(req.params.id)
        .then(existingEquipment => {
            if (!existingEquipment) {
                return res.status(404).json({ error: "Equipment not found" });
            }

            // Supprimez l'ancienne image si une nouvelle image est fournie
            if (req.file && existingEquipment.image) {
                deleteOldImage(existingEquipment.image);
            }

            // Mettez à jour l'équipement avec les nouveaux champs
            Equipment.findByIdAndUpdate(
                req.params.id,
                { $set: updateFields },
                { new: true, runValidators: true }
            )
            .then(updatedEquipment => {
                res.status(200).json(updatedEquipment);
            })
            .catch(err => {
                res.status(500).json({ error: err.message });
            });
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}

export function getEquipmentByUserId(req, res) {
    Equipment.find({ userId: req.params.userId })
        .then(equipments => {
            if (equipments.length === 0) {
                return res.status(404).json({ error: "No equipment found for this user" });
            }
            res.status(200).json(equipments);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
}