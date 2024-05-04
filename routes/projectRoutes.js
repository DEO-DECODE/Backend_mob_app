import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  addProject,
  getProjects,
  getProjectByid,
  getProjectsByAssignedTo,
} from "../controllers/projectControllers.js";
const router = express.Router();
router.post("/addproject", isAuthenticated, addProject);
router.get("/getprojects", isAuthenticated, getProjects);
router.get("/getproject/:id", isAuthenticated, getProjectByid);
router.get("/getprojects/:id", isAuthenticated, getProjectsByAssignedTo);
export default router;
