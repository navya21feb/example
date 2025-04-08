import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  type: String,
  content: [{}],
  uploadedAt: Date,
});

export default mongoose.model("Report", reportSchema);
