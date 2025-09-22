// routes/userRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { updateUserProfile } from "../controllers/user.controller.js";

const UserRouter = express.Router();

UserRouter.put("/profile", protect, updateUserProfile);

export default UserRouter;
