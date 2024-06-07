import { User } from "../models/userModel.js";
import { errorHandler } from "../middlewares/errorHandler.js";
import { Project } from "../models/projectModel.js";
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

export const addProjectByAdmin = async (req, res, next) => {
  try {
    // console.log(req);
    const { id } = req.params;
    const isExist = await User.findById(id);
    if (!isExist) {
      return next(errorHandler(404, "No such user exists"));
    }
    const { title, subject, university, duration, description } = req.body;
    if (!title || !subject || !duration) {
      return next(errorHandler(400, "Please Provide all the mandaory fields"));
    }
    if (!req.file) {
      return next(errorHandler(400, "No file uploaded"));
    }
    const { originalname, filename, path } = req.file;
    const uploadedBy = req.user._id;
    const project = await Project.create({
      uploadedBy,
      title,
      subject,
      university,
      duration,
      description,
      attachment: {
        attachmentName: originalname,
        attachmentUrl: `/uploads/${filename}`,
      },
      status: "active",
      assignedTo: id,
    });
    res.status(201).json({
      success: true,
      message: "Project Added Successfully",
      project,
    });
  } catch (error) {
    next(error);
  }
};
