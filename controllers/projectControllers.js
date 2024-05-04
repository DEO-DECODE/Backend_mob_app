import { errorHandler } from "../middlewares/errorHandler.js";
import { Project } from "../models/projectModel.js";

export const addProject = async (req, res, next) => {
  try {
    const { title, subject, university, duration, status } = req.body;
    if (!title || !subject || !duration) {
      return next(errorHandler(400, "Please Provide all the mandaory fields"));
    }
    const uploadedBy = req.user._id;
    const project = await Project.create({
      uploadedBy,
      title,
      subject,
      university,
      duration,
      attachment: {
        attchmentName: "Sample",
        attachmentUrl: "Sample Url",
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
    let status = req.query.status;
    if (status === undefined || status === "all") {
      status = { $in: ["active", "available", "completed"] };
    } else if (status === "active") {
      status = { $in: ["active"] };
    } else if (status === "available") {
      status = { $in: ["available"] };
    } else if (status === "completed") {
      status = { $in: ["completed"] };
    }
    const projects = await Project.find({ status });
    res.status(200).json({
      projects,
      success: true,
      message: `Showing Projects`,
    });
  } catch (error) {
    next(error);
  }
};
