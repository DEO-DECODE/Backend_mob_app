import express from "express";
import {
  creteOrder,
  verifyPayment,
} from "../controllers/paymentController.js";
const router = express.Router();
router.post("/order", creteOrder);
router.post("/verify", verifyPayment);
export default router;
