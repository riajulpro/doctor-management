import express from "express";
import Billing from "../../models/billing.model";
import {
  createNewBilling,
  deleteBillingById,
  getAllBillings,
  getBillingById,
  updateBillingById,
} from "../../controllers/billing.controller";
const router = express.Router();

// Create a new billing record
router.post("/billings", createNewBilling);

// Get all billing records
router.get("/billings", getAllBillings);

// Get a billing record by ID
router.get("/billings/:id", getBillingById);

// Update a billing record by ID
router.patch("/billings/:id", updateBillingById);

// Delete a billing record by ID
router.delete("/billings/:id", deleteBillingById);

export default router;
