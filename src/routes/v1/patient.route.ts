import express from "express";
import Patient from "../../models/patient.model";
import {
  createNewPatient,
  deletePatientById,
  getAllPatients,
  getPatientById,
  updatePatientById,
} from "../../controllers/patient.controller";
const router = express.Router();

// Create a new patient
router.post("/patients", createNewPatient);

// Get all patients
router.get("/patients", getAllPatients);

// Get a patient by ID
router.get("/patients/:id", getPatientById);

// Update a patient by ID
router.patch("/patients/:id", updatePatientById);

// Delete a patient by ID
router.delete("/patients/:id", deletePatientById);

export default router;
