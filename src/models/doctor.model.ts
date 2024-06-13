import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  fee: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  availability: {
    type: [String], // Array of available slots
    required: true,
  },
});

const Doctor = mongoose.model("Doctor", DoctorSchema);
export default Doctor;
