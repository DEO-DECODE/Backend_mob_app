import { errorHandler } from "../middlewares/errorHandler.js";
import { Project } from "../models/projectModel.js";

export const addProject = async (req, res, next) => {
  try {
    const { title, subject, university, duration, status, description } =
      req.body;
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
        attachmentUrl: path,
      },
      status,
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
export const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().populate("uploadedBy");
    res.status(200).json({
      projects,
      success: true,
      message: `Showing Projects`,
    });
  } catch (error) {
    next(error);
  }
};
export const getProjectByid = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) {
      return next(errorHandler(404, "No such project exists"));
    }
    res.status(201).json({
      project,
      success: true,
      message: "Project found successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getProjectsByAssignedTo = async (req, res, next) => {
  try {
    const { id } = req.params;
    // console.log(req.user);
    console.log(id);
    // const projects = await Project.find().populate("assignedTo");
    const projects = await Project.find({assignedTo: id});
    if (!projects || projects.length === 0) {
      return next(errorHandler(404, "No projects found for this user"));
    }
    res.status(200).json({
      success: true,
      message: `Finding all projects assigned to ${req.user.name}`,
      projects,
    });
  } catch (error) {
    next(error);
  }
};
