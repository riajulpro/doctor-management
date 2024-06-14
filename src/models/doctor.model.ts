import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
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
  availability: {
    type: [String],
    required: true,
  },
});

const Doctor = mongoose.model("Doctor", DoctorSchema);
export default Doctor;
