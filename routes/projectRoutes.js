import express from "express";
import { autherizedClient, isAuthenticated } from "../middlewares/auth.js";
import {
  addProject,
  getProjects,
  getProjectByid,
} from "../controllers/projectControllers.js";
import { upload } from "../middlewares/uploadMiddleware.js";
const router = express.Router();
// Use attachment field in the formData in the front-end
router.post(
  "/addproject",
  isAuthenticated,
  autherizedClient,
  upload.single("attachment"),
  addProject
);
router.get("/getprojects", isAuthenticated, getProjects);
router.get("/getproject/:id", isAuthenticated, getProjectByid);
export default router;
