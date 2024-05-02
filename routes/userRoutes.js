import express from "express";
const router = express.Router();
import { login, register, updateUser, deleteProfile } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";
router.post("/login", login);
router.post("/register", register);
router
  .route("/:id")
  .put(isAuthenticated, updateUser)
  .delete(isAuthenticated, deleteProfile);
router.delete("/delete", isAuthenticated);
export default router;
