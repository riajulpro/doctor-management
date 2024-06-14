import mongoose from "mongoose";

const AppointmentRequestSchema = new mongoose.Schema({
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "canceled"],
    required: true,
  },
});

const AppointmentRequest = mongoose.model(
  "AppointmentRequest",
  AppointmentRequestSchema
);
export default AppointmentRequest;
