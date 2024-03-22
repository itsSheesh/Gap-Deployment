import User from "../models/user.model.js";
import Conversation from "../models/conversation.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const conversations = await Conversation.find({
      participants: loggedInUserId,
    });

    return res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const allUser = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );
    return res.status(200).json(allUser);
  } catch (error) {
    res.status(500).json({ error: "Can't get users" });
  }
};
