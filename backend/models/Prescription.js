import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
  doctor: {
    name: String,
    regNo: String,
  },
  patient: {
    name: String,
    age: String,
    gender: String,
    email: String,
  },
  medicines: [
    {
      name: String,
      dosage: String,
      duration: String,
    },
  ],
  date: String,
  signature: String, // Base64 image
  logo: String, // Base64 hospital logo
});

const Prescription = mongoose.model("Prescription", prescriptionSchema);
export default Prescription;
