import Maintenance from "../models/maintenance.js";
import Equipment from "../models/equipment.js";
import { validationResult } from 'express-validator';

// Create a new maintenance record
export const createMaintenance = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { ID_Equipement, Date_Maintenance, Type_Maintenance, Description, Coût_Maintenance } = req.body;

    // Verify that the equipment exists before creating a maintenance record
    Equipment.findById(ID_Equipement).then((foundEquipment) => {
        if (!foundEquipment) {
            return res.status(404).json({ error: "Equipment not found" });
        }

        const newMaintenance = new Maintenance({
            ID_Equipement,
            Date_Maintenance,
            Type_Maintenance,
            Description,
            Coût_Maintenance
        });

        newMaintenance.save()
            .then(maintenance => res.status(201).json(maintenance))
            .catch(err => res.status(500).json({ error: err.message }));
    });
};

// Get a maintenance record by ID
export const getMaintenanceById = (req, res) => {
    Maintenance.findById(req.params.id)
        .then(maintenance => {
            if (!maintenance) {
                return res.status(404).json({ error: "Maintenance record not found" });
            }
            res.status(200).json(maintenance);
        })
        .catch(err => res.status(500).json({ error: err.message }));
};

// Update a maintenance record
export const updateMaintenance = (req, res) => {
    const { Date_Maintenance, Type_Maintenance, Description, Coût_Maintenance } = req.body;

    Maintenance.findByIdAndUpdate(
        req.params.id, 
        { Date_Maintenance, Type_Maintenance, Description, Coût_Maintenance },
        { new: true }
    )
    .then(updatedMaintenance => {
        if (!updatedMaintenance) {
            return res.status(404).json({ error: "Maintenance record not found" });
        }
        res.status(200).json(updatedMaintenance);
    })
    .catch(err => res.status(500).json({ error: err.message }));
};

// Delete a maintenance record
export const deleteMaintenance = (req, res) => {
    Maintenance.findByIdAndDelete(req.params.id)
        .then(deletedMaintenance => {
            if (!deletedMaintenance) {
                return res.status(404).json({ error: "Maintenance record not found" });
            }
            res.status(200).json({ message: "Maintenance record successfully deleted" });
        })
        .catch(err => res.status(500).json({ error: err.message }));
};

// List all maintenance records
export const getAllMaintenanceRecords = (req, res) => {
    Maintenance.find({})
        .populate('ID_Equipement') // Optionally populate the equipment details
        .then(maintenanceRecords => res.status(200).json(maintenanceRecords))
        .catch(err => res.status(500).json({ error: err.message }));
};
