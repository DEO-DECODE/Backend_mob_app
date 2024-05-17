import mongoose from "mongoose";
const chatSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.ObjectId,
    ref: "Project",
  },
  senderId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  receiverId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  message: {
    type: String,
  },
  attachment: {
    attachmentName: {
      type: String,
    },
    attachmentUrl: {
      type: String,
    },
  },
  timestamp: { type: Date, default: Date.now },
});
export const Chat= mongoose.model("Chat", chatSchema, "Chat");