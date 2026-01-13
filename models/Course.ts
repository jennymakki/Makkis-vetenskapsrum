import mongoose from "mongoose";

const UnitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  files: [{ type: String }],
});

const CourseSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  course: { type: String, required: true },
  units: [UnitSchema],
});

export default mongoose.models.Course || mongoose.model("Course", CourseSchema);