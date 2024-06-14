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
import { authenticateToken } from "../../middlewares/authenticateToken";

// Create a new doctor
router.post("/doctors", createNewDoctor);

// Get all doctors
router.get("/doctors", authenticateToken, getAllDoctors);

// Get a doctor by ID
router.get("/doctors/:id", authenticateToken, getDoctorById);

// Update a doctor by ID
router.patch("/doctors/:id", authenticateToken, updateDoctorById);

// Delete a doctor by ID
router.delete("/doctors/:id", authenticateToken, deleteDoctorById);

export default router;
