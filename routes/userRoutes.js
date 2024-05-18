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
} from "../controllers/userController.js";
import { isAuthenticated, autherizedClient } from "../middlewares/auth.js";
router.post("/login", login);
router.post("/register", register);
router.route("/update").put(isAuthenticated, updateUser);
router.delete("/delete", isAuthenticated, deleteProfile);
router.get("/me", isAuthenticated, getOwnProfile);
router.put("/acceptoffer/:id", isAuthenticated, acceptOffer);
router.get("/acceptanddownlaod/:id", isAuthenticated, getDownloadUrl);
router.get(
  "/getproposalsbyprojectid/:id",
  isAuthenticated,
  autherizedClient,
  getProposalsByProjectId
);
export default router;
