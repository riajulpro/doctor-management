import { Request, Response } from "express";
import Patient from "../models/patient.model";

export const createNewPatient = async (req: Request, res: Response) => {
  try {
    const { phone } = req.body;

    const existingPatient = await Patient.findOne({ phone });
    if (existingPatient) {
      return res
        .status(400)
        .json({ message: "Patient with this phone number already exists" });
    }

    const newPatient = new Patient(req.body);
    const savedPatient = await newPatient.save();
    res.status(201).json({
      success: true,
      message: "Patient successfully created!",
      patient: savedPatient,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getAllPatients = async (req: Request, res: Response) => {
  try {
    const patients = await Patient.find();
    res
      .status(200)
      .json({ success: true, message: "data retrieved!", patients });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getPatientById = async (req: Request, res: Response) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res
      .status(200)
      .json({ success: true, message: "data retrieved!", patient });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updatePatientById = async (req: Request, res: Response) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedPatient)
      return res.status(404).json({ message: "Patient not found" });

    res.status(200).json({
      success: true,
      message: "Patient successfully updated!",
      doctor: updatedPatient,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
export const deletePatientById = async (req: Request, res: Response) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
    if (!deletedPatient)
      return res.status(404).json({ message: "Patient not found" });
    res.status(204).json({ message: "Patient deleted" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
