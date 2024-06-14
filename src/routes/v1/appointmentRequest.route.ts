import express from "express";
import { createAppointmentRequest } from "../../controllers/appointmentRequest.controller";
const router = express.Router();

router.post("/", createAppointmentRequest);

export default router;
