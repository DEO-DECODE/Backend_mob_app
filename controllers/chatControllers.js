import { errorHandler } from "../middlewares/errorHandler.js";
import { Chat } from "../models/chatModels.js";
import { Project } from "../models/projectModel.js";
export const saveChats = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const isExist= await Project.findById(projectId);
    if(!isExist){
        return next(errorHandler(404, "No Such Project exists"));
    }
    const { senderId, receiverId, message } = req.body;
    let attachment = null;
    if (req.file) {
      attachment = {
        attachmentName: req.file.originalname,
        attachmentUrl: req.file.path,
      };
    }
    const newChat = new Chat({
      projectId,
      senderId,
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

export const getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find({})
      .populate("senderId", "name")
      .populate("receiverId", "name")
      .sort({ timestamp: -1 });
    res.status(200).json(chats);
  } catch (error) {
    next(error);
  }
};
