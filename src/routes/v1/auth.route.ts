import express from "express";
import {
  loginAsDoctor,
  loginAsPatient,
} from "../../controllers/auth.controller";
const router = express.Router();

router.post("/login/patient", loginAsPatient);
router.post("/login/doctor", loginAsDoctor);

export default router;
