import { User } from "../models/userModel.js";
import { errorHandler } from "./errorHandler.js";
import jwt from "jsonwebtoken";
export const isAuthenticated = async (req, res, next) => {
  // console.log(req.body);
  // console.log(req.file);
  try {
    const { token } = req.cookies;
    if (!token) {
      return next(errorHandler(401, "Please Login to access"));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decodedData);
    next();
  } catch (error) {
    next(error);
  }
};
export const autherizedAdmin = (req, res, next) => {
  if (req.user.accountType !== "admin") {
    return next(errorHandler(403, "You can not access this resource"));
  }
  next();
};
export const autherizedFreelancer = (req, res, next) => {
  if (req.user.accountType !== "freelancer") {
    return next(errorHandler(403, "You can not access this resource"));
  }
  next();
};
