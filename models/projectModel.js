import mongoose from "mongoose";
/*
 */
const projectSchema = new mongoose.Schema({
  uploadedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Please Add the details of the owner of the project"],
  },
  title: {
    type: String,
    required: [true, "Please add the title of the project"],
  },
  subject: {
    type: String,
  },
  description: {
    type: String,
  },
  university: {
    type: String,
  },
  duration: {
    type: Number,
    required: [true, "Please provide the duration"],
  },
  attachment: {
    attachmentName: {
      type: String,
    },
    attachmentUrl: {
      type: String,
    },
  },
  status: {
    type: String,
    enum: ["active", "available", "completed", "in checking"],
    default: "available",
  },
  assignedTo: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  delivery: {
    deliveryName: {
      type: String,
    },
    deliveryUrl: {
      type: String,
    },
  },
});
export const Project = mongoose.model("Project", projectSchema, "Project");
