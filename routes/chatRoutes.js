import express from "express";
import { saveChats, getAllChats } from "../controllers/chatControllers.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();
router.post(
  "/savechats/:projectId",
  isAuthenticated,
  upload.single("attachment"),
  saveChats
);
router.get("/getallchats", isAuthenticated, getAllChats);
export default router;
