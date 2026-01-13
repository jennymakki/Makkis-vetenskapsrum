import mongoose from "mongoose";

const MaterialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    course: {
      type: String,
      required: true,
    },

    unit: {
      type: String,
      required: true,
    },

    fileUrl: String,
    fileName: String,
  },
  { timestamps: true }
);

export default mongoose.models.Material ||
  mongoose.model("Material", MaterialSchema);