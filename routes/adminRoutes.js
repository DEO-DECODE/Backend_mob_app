import express from "express";
import { isAuthenticated, autherizedAdmin } from "../middlewares/auth.js";
import { getAllUsers, deleteUser } from "../controllers/adminControllers.js";
const router = express.Router();
router.get("/users", isAuthenticated, autherizedAdmin, getAllUsers);
router.delete("/delete/:id", isAuthenticated, autherizedAdmin, deleteUser);
export default router;
