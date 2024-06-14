import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
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
  appointment_date: {
    type: Date,
    required: true,
  },
  appointment_time: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "scheduled", "canceled", "completed"],
    required: true,
  },
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);
export default Appointment;
