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
  university: {
    type: String,
  },
  duration: {
    type: Number,
    required: [true, "Please provide the duration"],
  },
  attachment: {
    attchmentName: {
      type: String,
      required: [true, "Please Provide the attachment"],
    },
    attachmentUrl: {
      type: String,
      required: [true, "Please Provide the url"],
    },
  },
  status: {
    type: String,
    enum: ["active", "available", "completed"],
    default: "available",
  },
  assignedTo: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
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
export const Project = mongoose.model("Projects", projectSchema, "Projects");