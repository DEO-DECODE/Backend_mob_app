import { errorHandler } from "../middlewares/errorHandler.js";
import { Project } from "../models/projectModel.js";
import { Proposal } from "../models/proposalModel.js";
export const bidForProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) {
      return next(errorHandler(404, "There is no such project"));
    }
    const { proposedDuration, proposedPrice, finalPrice } = req.body;
    if (!proposedDuration || !proposedPrice || !finalPrice) {
      return next(errorHandler(400, "Please Provide all the mandaory fields"));
    }
    const proposedBy = req.user.id;
    const projectId = id;
    const existingProposal = await Proposal.findOne({
      proposedBy,
      projectId,
      proposalStatus: { $ne: "completed" },
    });

    if (existingProposal) {
      return next(
        errorHandler(400, "You have already proposed for this project")
      );
    }

    const proposal = await Proposal.create({
      proposedBy,
      projectId,
      proposedDuration,
      proposedPrice,
      finalPrice,
    });
    res.status(201).json({
      sucess: true,
      message: "Proposed Successfully",
      proposal,
    });
  } catch (error) {
    next(error);
  }
};
export const uploadDocument = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!req.file) {
      return next(errorHandler(400, "No file uploaded"));
    }
    if (!req.file) {
      next(errorHandler(400, "No file Uploaded"));
    }
    const { originalname, filename, path } = req.file;
    const delivery = {
      deliveryName: originalname,
      deliveryUrl: `/uploads/${filename}`,
    };
    const project = await Project.findById(id);
    if (!project) {
      return next(errorHandler(404, "Project not found"));
    }
    console.log(project.assignedTo);
    console.log(req.user.id);
    if (project.assignedTo.toString() !== req.user.id.toString()) {
      return next(
        errorHandler(401, "You cannot upload doccument for this project")
      );
    }
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { delivery, status: "in checking" },
      { new: true }
    );
    res.status(200).json({
      updatedProject,
      success: true,
      message: "Attachment uploaded successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getProjectsByAssignedTo = async (req, res, next) => {
  try {
    const { id } = req.user;
    console.log(id);
    const projects = await Project.find({ assignedTo: id }).populate(
      "assignedTo"
    );

    if (!projects || projects.length === 0) {
      return next(new Error("No projects found for this user"));
    }

    res.status(200).json({
      success: true,
      message: `Showing projects assigned to user ${id}`,
      projects,
    });
  } catch (error) {
    next(error);
  }
};

export const getDownloadUrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) {
      return next(errorHandler(404, "Project not found"));
    }
    if (!project.attachment || !project.attachment.attachmentUrl) {
      return next(errorHandler(404, "No attachment found for this project"));
    }
    const downloadUrl = `${req.protocol}://${req.get("host")}${
      project.attachment.attachmentUrl
    }`;
    res.status(200).json({
      downloadUrl,
      success: true,
      message: "Dowmload url Provided",
    });
  } catch (error) {
    next(error);
  }
};
