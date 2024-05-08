import express from "express";
const router = express.Router();
import {
  bidForProject,
  uploadDocument,
} from "../controllers/freelancerControllers.js";
import { autherizedFreelancer, isAuthenticated } from "../middlewares/auth.js";
import { upload } from "../middlewares/uploadMiddleware.js";
router.post("/bid/:id", isAuthenticated, autherizedFreelancer, bidForProject);
router.put(
  "/upload/:id",
  isAuthenticated,
  upload.single("delivery"),
  autherizedFreelancer,
  uploadDocument
);
export default router;
