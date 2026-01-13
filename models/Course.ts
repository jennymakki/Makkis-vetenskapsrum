import mongoose from "mongoose";

export interface File {
  name: string;
  url: string;
}

export interface Unit {
  name: string;
  files: File[];
}

export interface CourseDoc extends mongoose.Document {
  subject: string;
  course: string;
  units: Unit[];
}

const UnitSchema = new mongoose.Schema<Unit>({
  name: { type: String, required: true },
  files: [
    {
      name: { type: String },
      url: { type: String },
    },
  ],
});

const CourseSchema = new mongoose.Schema<CourseDoc>({
  subject: { type: String, required: true },
  course: { type: String, required: true },
  units: [UnitSchema],
});

export default mongoose.models.Course || mongoose.model<CourseDoc>("Course", CourseSchema);