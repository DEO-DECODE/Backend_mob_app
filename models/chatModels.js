import mongoose from "mongoose";
const chatSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.ObjectId,
    ref: "Projects",
  },
  senderId: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
  },
  receiverId: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
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
export const Chat= mongoose.model("Chats", chatSchema, "Chats");