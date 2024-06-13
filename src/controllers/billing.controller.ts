import { Request, Response } from "express";
import Billing from "../models/billing.model";

export const createNewBilling = async (req: Request, res: Response) => {
  try {
    const newBilling = new Billing(req.body);
    const savedBilling = await newBilling.save();
    res.status(201).json(savedBilling);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getAllBillings = async (req: Request, res: Response) => {
  try {
    const billings = await Billing.find();
    res.status(200).json(billings);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getBillingById = async (req: Request, res: Response) => {
  try {
    const billing = await Billing.findById(req.params.id);
    if (!Billing) return res.status(404).json({ message: "Billing not found" });
    res.status(200).json(billing);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateBillingById = async (req: Request, res: Response) => {
  try {
    const updatedBilling = await Billing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedBilling)
      return res.status(404).json({ message: "Billing not found" });
    res.status(200).json(updatedBilling);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteBillingById = async (req: Request, res: Response) => {
  try {
    const deletedBilling = await Billing.findByIdAndDelete(req.params.id);
    if (!deletedBilling)
      return res.status(404).json({ message: "Billing not found" });
    res.status(200).json({ message: "Billing deleted" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
