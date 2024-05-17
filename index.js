import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
//Routes import
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import freelancerRoutes from "./routes/freelancerRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
config({ path: "./config/config.env" });
dbConnection();
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/project", projectRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/freelancer", freelancerRoutes);
app.use("/api/v1/chats", chatRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use((err, req, res, next) => {
  const message = err.message || "Internal Server Error";
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server is running on Port number", PORT);
});
