import User from "../models/user.model.js";
import Conversation from "../models/conversation.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const conversations = await Conversation.find({
      participants: loggedInUserId,
    }).populate({
      path: "participants",
      select: "profilePic fullName userName",
    });

    const otherUserIds = conversations.flatMap((conversation) => {
      return conversation.participants.filter(
        (participantsId) => participantsId !== loggedInUserId
      );
    });

    const users = await User.find({ _id: { $in: otherUserIds } }).select(
      "-password"
    );

    return res.status(200).json({ conversations, users });
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
export const getAllConversations = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const { id: userName } = req.params;

    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(500).json({ error: "User not found" });
    }

    let conversation = await Conversation.findOne({
      participants: {
        $all: [loggedInUserId, user._id],
      },
    }).populate({
      path: "participants",
      select: "profilePic fullName userName",
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [loggedInUserId, user._id],
      });
      
      await conversation
        .populate({
          path: "participants",
          select: "profilePic fullName userName",
        })
        .execPopulate();

      return res.status(200).json(conversation);
    } else {
      return res.status(200).json(conversation);
    }
  } catch (error) {
    res.status(500).json({ error: "Can't get Conversations" });
  }
};
