import { User } from "../models/userModel.js";
import { errorHandler } from "../middlewares/errorHandler.js";
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      users,
      sucess: true,
      message: "All registered users fetched",
    });
  } catch (error) {
    next(error);
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({
      sucess: true,
      message: "User has been deleted",
    });
  } catch (error) {
    next(error);
  }
};
