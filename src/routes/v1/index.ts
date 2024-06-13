import express from "express";
const router = express.Router();
import patientApi from "./patient.route";
import doctorApi from "./doctor.route";
import appoinmentApi from "./appointment.route";
import billingApi from "./billing.route";

const routerPath = [
  {
    path: "/p",
    router: patientApi,
  },
  {
    path: "/d",
    router: doctorApi,
  },
  {
    path: "/a",
    router: appoinmentApi,
  },
  {
    path: "/b",
    router: billingApi,
  },
];

routerPath.forEach((route) => router.use(route.path, route.router));

export default router;
