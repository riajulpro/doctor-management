import { Request, Response } from "express";
import Doctor from "../models/doctor.model";
import bcrypt from "bcrypt";

export const createNewDoctor = async (req: Request, res: Response) => {
  try {
    const { email, phone, password } = req.body;

    const existingDoctor = await Doctor.findOne({
      $or: [{ email }, { phone }],
    });
    if (existingDoctor) {
      return res.status(400).json({
        message: "Doctor with this email or phone number already exists",
      });
    }

    // make the password hash
    const hashedPassword = await bcrypt.hash(password, 10);
    const { password: string, ...withoutPassword } = req.body;

    const newDoctor = new Doctor({
      ...withoutPassword,
      password: hashedPassword,
    });
    const savedDoctor = await newDoctor.save();
    res.status(201).json({
      success: true,
      message: "Doctor successfully created!",
      doctor: savedDoctor,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getAllDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await Doctor.find();
    res
      .status(200)
      .json({ success: true, message: "data retrieved!", doctors: doctors });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getDoctorById = async (req: Request, res: Response) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res
      .status(200)
      .json({ success: true, message: "data retrieved!", doctor: doctor });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateDoctorById = async (req: Request, res: Response) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedDoctor)
      return res.status(404).json({ message: "Doctor not found" });
    res.status(200).json({
      success: true,
      message: "Doctor successfully updated!",
      doctor: updatedDoctor,
    });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteDoctorById = async (req: Request, res: Response) => {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!deletedDoctor)
      return res.status(404).json({ message: "Doctor not found" });
    res.status(200).json({ message: "Doctor successfully deleted!" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
