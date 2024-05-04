import { errorHandler } from "../middlewares/errorHandler.js";
import { User } from "../models/userModel.js";
import { sendToken } from "../utils/jwtToken.js";
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
    // const { password: excludedPassword, ...userWithoutPassword } =
    //   user.toObject();
    sendToken(user, 201, res, "Login Successfully", next);
  } catch (error) {
    next(error);
  }
};
export const register = async (req, res, next) => {
  try {
    console.log(req.body);
    const { name, email, accountType, password, number } = req.body;
    if (!name || !email || !accountType || !password || !number) {
      return next(errorHandler(400, "Please Provide all Necessary detail!"));
    }
    const isEmail = await User.findOne({ email });
    if (isEmail) {
      return next(errorHandler(400, "Email already registered!"));
    }
    const user = await User.create({
      name,
      email,
      password,
      accountType,
      number,
    });
    sendToken(user, 201, res, "User registered successfully", next);
  } catch (error) {
    console.log("Some error occured in login");
    next(error);
  }
};
export const updateUser = async (req, res, next) => {
  try {
    // console.log(req.body);
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          name: req.body.name,
          number: req.body.number,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      user,
      success: true,
      message: "User Updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const deleteProfile = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      sucess: true,
      message: "Your Profile has been deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};
