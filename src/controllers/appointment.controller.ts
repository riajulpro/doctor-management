import { Request, Response } from "express";
import Appointment from "../models/appoinment.model";
import mongoose, { ClientSession } from "mongoose";
import Doctor from "../models/doctor.model";
import Patient from "../models/patient.model";
import Billing from "../models/billing.model";

export const createNewAppointment = async (req: Request, res: Response) => {
  let session: mongoose.ClientSession | null = null;

  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const { patient_id, doctor_id } = req.body;
    const patient = await Patient.findById(patient_id);
    const doctor = await Doctor.findById(doctor_id);

    if (!patient || !doctor) {
      (await session).abortTransaction();
      return res.status(400).json({ message: "Invalid patient or doctor ID" });
    }

    const newAppointment = new Appointment(req.body);
    const savedAppointment = await newAppointment.save({ session });

    const newBilling = new Billing({
      patient_id,
      amount: doctor.fee,
      payment_status: "unpaid",
    });
    const savedBilling = await newBilling.save({ session });

    await session.commitTransaction();
    res.status(201).json({
      success: true,
      message: "Your appointment successfully fixed!",
      appointment: savedAppointment,
    });
  } catch (err: any) {
    session?.abortTransaction();
    res.status(400).json({ message: err.message });
  } finally {
    if (session) {
      session.endSession();
    }
  }
};

export const getAllAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient_id")
      .populate("doctor_id")
      .exec();

    res.status(200).json({
      success: true,
      message: "Successfully retrieved the data!",
      appointments,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getAppointmentById = async (req: Request, res: Response) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });
    res.status(200).json(appointment);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateAppointmentById = async (req: Request, res: Response) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedAppointment)
      return res.status(404).json({ message: "Appointment not found" });
    res.status(200).json(updatedAppointment);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteAppointmentById = async (req: Request, res: Response) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(
      req.params.id
    );
    if (!deletedAppointment)
      return res.status(404).json({ message: "Appointment not found" });
    res.status(200).json({ message: "Appointment deleted" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
