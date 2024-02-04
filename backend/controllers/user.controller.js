import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;


    // this line bellow is for getting all users except logged in users
    const allUsersExceptLoggedInUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    // this commented line bellow is for getting logged in users also => ( for creating saved message )
    // const allUsers = await User.find().select("-password")


    return res.status(200).json(allUsersExceptLoggedInUsers)
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
