import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  addProject,
  getProjects,
  getProjectByid,
  getProjectsByAssignedTo,
} from "../controllers/projectControllers.js";
import { upload } from "../middlewares/uploadMiddleware.js";
const router = express.Router();
// Use attachment field in the formData in the front-end
router.post(
  "/addproject",
  isAuthenticated,
  upload.single("attachment"),
  addProject
);
router.get("/getprojects", isAuthenticated, getProjects);
router.get("/getproject/:id", isAuthenticated, getProjectByid);
router.get("/getprojects/:id", isAuthenticated, getProjectsByAssignedTo);
export default router;
