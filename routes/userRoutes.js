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
  acceptOffer,
  assignFreelancerToProject,
} from "../controllers/userController.js";
import { isAuthenticated, autherizedClient } from "../middlewares/auth.js";
router.post("/login", login);
router.post("/register", register);
router.route("/update").put(isAuthenticated, updateUser);
router.delete("/delete", isAuthenticated, deleteProfile);
router.get("/me", isAuthenticated, getOwnProfile);
router.put("/acceptoffer/:id", isAuthenticated, acceptOffer);
router.get("/acceptanddownlaod/:id", isAuthenticated, autherizedClient, getDownloadUrl);
router.get(
  "/getproposalsbyprojectid/:id",
  isAuthenticated,
  autherizedClient,
  getProposalsByProjectId
);
router.put("/assignfreelancer", isAuthenticated, autherizedClient, assignFreelancerToProject);
export default router;
