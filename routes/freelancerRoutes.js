import express from "express";
const router = express.Router();
import {
  bidForProject,
  getProjectsByAssignedTo,
  uploadDocument,
  getDownloadUrl,
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
router.get(
  "/getprojectsbyassignedto",
  isAuthenticated,
  autherizedFreelancer,
  getProjectsByAssignedTo
);
router.get(
  "/acceptanddownload/:id",
  isAuthenticated,
  autherizedFreelancer,
  getDownloadUrl
);
export default router;
