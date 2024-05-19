import { errorHandler } from "../middlewares/errorHandler.js";
import { Chat } from "../models/chatModels.js";
import { Project } from "../models/projectModel.js";
export const saveChats = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const isExist = await Project.findById(projectId);
    if (!isExist) {
      return next(errorHandler(404, "No Such Project exists"));
    }
    const { receiverId, message } = req.body;
    let attachment = null;
    if (req.file) {
      const { originalname, filename } = req.file;
      attachment = {
        attachmentName: originalname,
        attachmentUrl: `/uploads/${filename}`,
      };
    }
    const newChat = new Chat({
      projectId,
      senderId: req.user.id,
      receiverId,
      message,
      attachment,
      timestamp: Date.now(),
    });
    const savedChat = await newChat.save();
    res.status(201).json({
      savedChat,
      success: true,
      message: "Chat saved successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllChatsByProjectId = async (req, res) => {
  try {
    const { projectId } = req.params;
    const projectExists = await Project.findById(projectId);
    if (!projectExists) {
      return next(errorHandler(404, "No Such Project Exists"));
    }
    const chats = await Chat.find({ projectId })
      .populate("senderId", "name")
      .populate("receiverId", "name")
      .sort({ timestamp: -1 });
    res.status(200).json(chats);
  } catch (error) {
    next(error);
  }
};

export const deleteChatsByProjectId = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const projectExists = await Project.findById(projectId);
    if (!projectExists) {
      return next(errorHandler(404, "No such project exists"));
    }
    const result = await Chat.deleteMany({ projectId });
    res.status(200).json({
      success: true,
      message: `Deleted ${result.deletedCount} chats associated with project ${projectExists.title}`,
    });
  } catch (error) {
    next(error);
  }
};
