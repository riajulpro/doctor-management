import express from "express";
import Patient from "../../models/patient.model";
import {
  createNewPatient,
  deletePatientById,
  getAllPatients,
  getPatientById,
  updatePatientById,
} from "../../controllers/patient.controller";
import { authenticateToken } from "../../middlewares/authenticateToken";
const router = express.Router();

// Create a new patient
router.post("/patients", createNewPatient);

// Get all patients
router.get("/patients", authenticateToken, getAllPatients);

// Get a patient by ID
router.get("/patients/:id", authenticateToken, getPatientById);

// Update a patient by ID
router.patch("/patients/:id", authenticateToken, updatePatientById);

// Delete a patient by ID
router.delete("/patients/:id", authenticateToken, deletePatientById);

export default router;
