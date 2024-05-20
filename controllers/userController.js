import { errorHandler } from "../middlewares/errorHandler.js";
import { User } from "../models/userModel.js";
import { sendToken } from "../utils/jwtToken.js";
import { Project } from "../models/projectModel.js";
import { Proposal } from "../models/proposalModel.js";
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
    sendToken(user, 201, res, "Login Successfully", next);
  } catch (error) {
    next(error);
  }
};
export const register = async (req, res, next) => {
  try {
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
    res.status(200).json({
      sucess: true,
      message: "Your Profile has been deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getOwnProfile = async (req, res, next) => {
  try {
    const profile = req.user;
    res.status(200).json({
      profile,
      sucess: true,
      message: "Fetched your details",
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

    const downloadUrlforDelivery = `${req.protocol}://${req.get("host")}/${
      project.delivery.deliveryUrl
    }`;

    const downloadUrlforAttachment = `${req.protocol}://${req.get("host")}/${
      project.attachment.attachmentUrl
    }`;
    res.status(200).json({
      downloadUrlforDelivery,
      downloadUrlforAttachment,
      success: true,
      message: "Dowmload url Provided",
    });
  } catch (error) {
    next(error);
  }
};

export const getProposalsByProjectId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const proposals = await Proposal.find({ projectId: id })
      .populate("proposedBy", "name email")
      .populate("projectId", "title");
    if (!proposals) {
      return next(errorHandler(404, "No Proposals found for this project"));
    }
    res.status(200).json({
      proposals,
      success: true,
      message: "All Proposals for this Project Fetched Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const acceptOffer = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const assignFreelancerToProject = async (req, res, next) => {
  try {
    const { projectId, freelancerId } = req.body;
    const project = await Project.findById(projectId);
    if (!project) {
      return next(errorHandler(404, "No Such Project Exist"));
    }
    const freelancer = await User.findById(freelancerId);
    if (!freelancer) {
      return next(errorHandler(404, "No Freelancer found"));
    }
    project.assignedTo = freelancerId;
    project.status = "active";
    await project.save();
    res.status(200).json({
      success: true,
      message: `Project assigned to freelancer ${freelancer.name}`,
      project,
    });
  } catch (error) {
    next(error);
  }
};

export const rejectDocument = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const projectId = req.params.id;
    const project = await Project.findOneAndUpdate(
      { _id: projectId, uploadedBy: userId },
      {
        $set: {
          delivery: null,
          status: "available",
        },
      },
      { new: true }
    );
    if (!project) {
      return next(
        errorHandler(404, "Project not found or you do not own this project")
      );
    }
    res
      .status(200)
      .json({ project, sucess: true, message: "Project updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteProposal = async (req, res, next) => {
  try {
    const proposalId = req.params.id;
    const proposal = await Proposal.findById(proposalId).populate("projectId");
    if (!proposal) {
      return next(errorHandler(404, "Proposal not found"));
    }
    if (proposal.projectId.uploadedBy.toString() !== req.user.id) {
      return next(
        errorHandler(403, "You do not have permission to delete this proposal")
      );
    }
    await Proposal.findByIdAndDelete(proposalId);
    res
      .status(200)
      .json({ sucess: true, message: "Proposal deleted successfully" });
  } catch (error) {
    next(error);
  }
};
