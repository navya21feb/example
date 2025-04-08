import express from "express";
import multer from "multer";

import {
  loginDoctor,
  appointmentsDoctor,
  appointmentCancel,
  doctorList,
  changeAvailablity,
  appointmentComplete,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
  doctorPrescription,
  doctorPrescriptionList,
  ocrImage,
  uploadReport,
} from "../controllers/doctorController.js";
import authDoctor from "../middleware/authDoctor.js";
const doctorRouter = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

doctorRouter.post("/login", loginDoctor);
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel);
doctorRouter.get("/appointments", authDoctor, appointmentsDoctor);
doctorRouter.get("/list", doctorList);
doctorRouter.post("/change-availability", authDoctor, changeAvailablity);
doctorRouter.post("/complete-appointment", authDoctor, appointmentComplete);
doctorRouter.get("/dashboard", authDoctor, doctorDashboard);
doctorRouter.get("/profile", authDoctor, doctorProfile);
doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile);
doctorRouter.post("/prescriptions", authDoctor, doctorPrescription);
doctorRouter.get("/prescriptions/list", authDoctor, doctorPrescriptionList);
doctorRouter.post("/upload", authDoctor, uploadReport);
doctorRouter.post("/ocr", authDoctor, upload.single("file"), ocrImage);

export default doctorRouter;
