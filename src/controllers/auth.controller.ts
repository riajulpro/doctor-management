import { Request, Response } from "express";
import Patient from "../models/patient.model";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../utils/generateAccessToken";
import Doctor from "../models/doctor.model";

export const loginAsPatient = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: `You must enter email and password`,
    });
  }

  try {
    const isUserExist = await Patient.findOne({ email });

    if (!isUserExist) {
      return res.status(404).json({
        success: false,
        message: `Your email ${email} desn't exist!`,
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      isUserExist.password
    );

    if (!isPasswordMatch) {
      return res.status(404).json({
        message: `Wrong password! Please enter correct password.`,
      });
    }

    const token = generateAccessToken(isUserExist.email);

    // Set token in cookies
    res.cookie("access_token", token, {
      httpOnly: true, // Makes the cookie inaccessible to client-side JavaScript
      secure: process.env.NODE_ENV === "production", // Ensures the cookie is sent only over HTTPS
      maxAge: 7 * 24 * 3600 * 1000, // 7 days in milliseconds
    });

    res.status(200).json({
      success: true,
      message: `You successfully logged in!`,
      access_token: token,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const loginAsDoctor = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: `You must enter email and password`,
    });
  }

  try {
    const isUserExist = await Doctor.findOne({ email });

    if (!isUserExist) {
      return res.status(404).json({
        success: false,
        message: `Your email ${email} desn't exist!`,
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      isUserExist.password
    );

    if (!isPasswordMatch) {
      return res.status(404).json({
        message: `Wrong password! Please enter correct password.`,
      });
    }

    const token = generateAccessToken(isUserExist.email);

    // Set token in cookies
    res.cookie("access_token", token, {
      httpOnly: true, // Makes the cookie inaccessible to client-side JavaScript
      secure: process.env.NODE_ENV === "production", // Ensures the cookie is sent only over HTTPS
      maxAge: 7 * 24 * 3600 * 1000, // 7 days in milliseconds
    });

    res.status(200).json({
      success: true,
      message: `You successfully logged in!`,
      access_token: token,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};
