import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar, getAllUsers } from "../controllers/user.controller.js";

const router = express.Router();
router.get("/forsidebar", protectRoute, getUsersForSidebar);
router.get("/all", protectRoute, getAllUsers)

export default router;
