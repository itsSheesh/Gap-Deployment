import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  getUsersForSidebar,
  getAllUsers,
  getAllConversations,
} from "../controllers/user.controller.js";

const router = express.Router();
router.get("/forsidebar", protectRoute, getUsersForSidebar);
router.get("/all", protectRoute, getAllUsers);
router.get("/:id", protectRoute, getAllConversations);

export default router;
