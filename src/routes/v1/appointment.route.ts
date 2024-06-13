import express from "express";
import Appointment from "../../models/appoinment.model";
import {
  createNewAppointment,
  deleteAppointmentById,
  getAllAppointments,
  getAppointmentById,
  updateAppointmentById,
} from "../../controllers/appointment.controller";
const router = express.Router();

// Create a new appointment
router.post("/appointments", createNewAppointment);

// Get all appointments
router.get("/appointments", getAllAppointments);

// Get an appointment by ID
router.get("/appointments/:id", getAppointmentById);

// Update an appointment by ID
router.patch("/appointments/:id", updateAppointmentById);

// Delete an appointment by ID
router.delete("/appointments/:id", deleteAppointmentById);

export default router;
