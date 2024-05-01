import express from "express"
const router= express.Router();
import { login, register, updateUser } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";
router.post("/login", login);
router.post("/register", register);
router.route("/:id").put(isAuthenticated, updateUser)
export default router;