import express from "express";
import {
  saveChats,
  getAllChatsByProjectId,
  deleteChatsByProjectId,
} from "../controllers/chatControllers.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();
router.post(
  "/savechats/:projectId",
  isAuthenticated,
  upload.single("attachment"),
  saveChats
);
router.get("/getallchats/:projectId", isAuthenticated, getAllChatsByProjectId);
router.delete("/deletechats/:projectId", deleteChatsByProjectId);
export default router;
