import Equipment from "../models/equipment.js";
import { validationResult } from 'express-validator';

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

    const { name, image, categorie, description } = req.body;

    Equipment.create({
        name,
        image,
        categorie,
        description
    })
    .then(newEquipment => {
        res.status(201).json(newEquipment);
    })
    .catch(err => {
        res.status(500).json({ error: err.message });
    });
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
