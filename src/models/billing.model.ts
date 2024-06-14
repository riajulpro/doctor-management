import mongoose from "mongoose";

const BillingSchema = new mongoose.Schema({
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  billing_date: {
    type: Date,
    required: false,
  },
  service: {
    type: String,
    required: true,
  },
  payment_status: {
    type: String,
    enum: ["paid", "unpaid"],
    required: true,
  },
});

const Billing = mongoose.model("Billing", BillingSchema);
export default Billing;
