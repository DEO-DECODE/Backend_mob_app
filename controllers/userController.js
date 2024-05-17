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
    // console.log(user);
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
    console.log(req.user);
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

export const getProposalsByProjectId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const proposals = await Proposal.find({ projectId: id })
      .populate("proposedBy", "name email")
      .populate("projectId", "title description");
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
  try{
    
  }
  catch(error){
    next(error);
  }
};
