import express from "express";
const router=express.Router();
import { bidForProject } from "../controllers/freelancerControllers.js";
import { autherizedFreelancer, isAuthenticated } from "../middlewares/auth.js";
router.post("/bid/:id", isAuthenticated, autherizedFreelancer, bidForProject);
export default router;