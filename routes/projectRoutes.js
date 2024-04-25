import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addProject } from "../controllers/projectControllers.js";
const router = express.Router();
router.post("/addproject", isAuthenticated, addProject);
export default router;
