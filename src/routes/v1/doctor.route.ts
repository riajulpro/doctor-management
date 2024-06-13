import express from "express";
const router = express.Router();
import Doctor from "../../models/doctor.model";
import {
  createNewDoctor,
  deleteDoctorById,
  getAllDoctors,
  getDoctorById,
  updateDoctorById,
} from "../../controllers/doctor.controller";

// Create a new doctor
router.post("/doctors", createNewDoctor);

// Get all doctors
router.get("/doctors", getAllDoctors);

// Get a doctor by ID
router.get("/doctors/:id", getDoctorById);

// Update a doctor by ID
router.patch("/doctors/:id", updateDoctorById);

// Delete a doctor by ID
router.delete("/doctors/:id", deleteDoctorById);

export default router;
