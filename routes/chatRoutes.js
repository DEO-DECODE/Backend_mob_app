import express from "express";
import {
  saveChats,
  getAllChatsByProjectId,
  deleteChatsByProjectId,
  getChatAttachmentUrl
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
router.delete(
  "/deletechats/:projectId",
  isAuthenticated,
  deleteChatsByProjectId
);
/*
Once the Status of the project gets completed, We will delete all the chats
corresponding to that project.
*/
router.get('/attachmentUrl/:chatId',isAuthenticated, getChatAttachmentUrl);
export default router;
