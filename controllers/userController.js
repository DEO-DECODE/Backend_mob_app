import { errorHandler } from "../middlewares/errorHandler.js";
import { User } from "../models/userModel.js";
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(
        errorHandler(400, "Please Provide Email and Password to login")
      );
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(errorHandler(400, "User with this email doesnot exists"));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(errorHandler(400, "Invalid email or password"));
    }
  } catch (error) {}
};
export const register = async (req, res, next) => {
  try {
  } catch (error) {
    console.log("Some error occured in login");
    next(error);
  }
};
