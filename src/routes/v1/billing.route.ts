import express from "express";
import Billing from "../../models/billing.model";
import {
  createNewBilling,
  deleteBillingById,
  getAllBillings,
  getBillingById,
  updateBillingById,
} from "../../controllers/billing.controller";
import { authenticateToken } from "../../middlewares/authenticateToken";
const router = express.Router();

// Create a new billing record
router.post("/billings", createNewBilling);

// Get all billing records
router.get("/billings", authenticateToken, getAllBillings);

// Get a billing record by ID
router.get("/billings/:id", authenticateToken, getBillingById);

// Update a billing record by ID
router.patch("/billings/:id", authenticateToken, updateBillingById);

// Delete a billing record by ID
router.delete("/billings/:id", authenticateToken, deleteBillingById);

export default router;
