import express from "express";
const router = express.Router();
import {
  login,
  register,
  updateUser,
  deleteProfile,
  getOwnProfile,
  getDownloadUrl,
  getProposalsByProjectId,
  assignFreelancerToProject,
  rejectDocument,
  deleteProposal,
} from "../controllers/userController.js";
import { isAuthenticated, autherizedClient } from "../middlewares/auth.js";
router.post("/login", login);
router.post("/register", register);
router.route("/update").put(isAuthenticated, updateUser);
router.delete("/delete", isAuthenticated, deleteProfile);
router.get("/me", isAuthenticated, getOwnProfile);
router.get(
  "/acceptanddownload/:id",
  isAuthenticated,
  autherizedClient,
  getDownloadUrl
);
router.get(
  "/getproposalsbyprojectid/:id",
  isAuthenticated,
  autherizedClient,
  getProposalsByProjectId
);
router.put(
  "/assignfreelancer",
  isAuthenticated,
  autherizedClient,
  assignFreelancerToProject
);
router.put(
  "/rejectdocument/:id",
  isAuthenticated,
  autherizedClient,
  rejectDocument
);
router.delete(
  "/deleteproposal/:id",
  isAuthenticated,
  autherizedClient,
  deleteProposal
);
router.get("/viewDoc/:id", isAuthenticated, autherizedClient, getDownloadUrl);
export default router;
