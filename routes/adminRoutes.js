import express from "express";
import { isAuthenticated, autherizedAdmin } from "../middlewares/auth.js";
import {
  getAllUsers,
  deleteUser,
  addProjectByAdmin,
} from "../controllers/adminControllers.js";
import { upload } from "../middlewares/uploadMiddleware.js";
const router = express.Router();
router.get("/users", isAuthenticated, autherizedAdmin, getAllUsers);
router.delete("/delete/:id", isAuthenticated, autherizedAdmin, deleteUser);
router.post(
  "/addprojectsbyadmin/:id",
  isAuthenticated,
  autherizedAdmin,
  upload.single("attachment"),
  addProjectByAdmin
);
export default router;
