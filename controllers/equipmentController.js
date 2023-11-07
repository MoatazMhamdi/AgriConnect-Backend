import equipment from "../models/equipment.js";
import { validationResult } from 'express-validator';

/**
 * ajout d'un menu
 * @param {*} req 
 * @param {*} res 
 * @returns cle
 */
export function createEquipment(req, res) {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    } else {
        equipment.create({
            nom: req.body.nom,
            paysOrigine: req.body.paysOrigine,
        }).then((newEquipment) => res.status(201).json({ 
            nom: newEquipment.nom, 
            paysOrigine: newEquipment.paysOrigine }))
            .catch((err) => {
                res.status(500).json({ error: err });
            });
    }
}
/**
 * affichage de tous les equipments
 * @param {*} req 
 * @param {*} res 
 */
export function getAll(req, res) {
    equipment.find({})
        .then((equipements) => {
            res.status(200).json(equipements.map((equipment) => {
                return {
                    _id: equipment._id,
                    nom: equipment.nom,
                }
            }));
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}

/**
 * affichage d'un equipment a partir de son id
 * @param {*} req 
 * @param {*} res 
 */
export function getOne(req, res) {
    equipment.findOne({ "_id": req.params.id })
        .then((equipment) => {
            res.status(200).json(equipment);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        });
}