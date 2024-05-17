import express from "express";
const router = express.Router();
import {
  login,
  register,
  updateUser,
  deleteProfile,
  getOwnProfile,
  getDownloadUrl,
  getProposalsByProjectId
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";
router.post("/login", login);
router.post("/register", register);
router.route("/update").put(isAuthenticated, updateUser);
router.delete("/delete", isAuthenticated, deleteProfile);
router.get("/me", isAuthenticated, getOwnProfile);
router.get("/acceptanddownlaod/:id", isAuthenticated, getDownloadUrl);
router.get("/getproposalsbyprojectid/:id", isAuthenticated,getProposalsByProjectId);
export default router;
