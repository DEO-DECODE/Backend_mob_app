import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addProject, getProjects } from "../controllers/projectControllers.js";
const router = express.Router();
router.post("/addproject", isAuthenticated, addProject);
router.get("/getprojects", isAuthenticated, getProjects);
export default router;
