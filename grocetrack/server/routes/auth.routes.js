import express from "express";
import { registerUser, loginUser , getCurrentUser, logoutUser } from "../controllers/auth.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const authRouter = express.Router();

// @route   POST /api/auth/register
authRouter.post("/register", registerUser);

// @route   POST /api/auth/login
authRouter.post("/login", loginUser);

// @route   GET /api/auth/me
authRouter.get("/me",protect, getCurrentUser);

// @route   POST /api/auth/logout
authRouter.post("/logout",logoutUser);

export default authRouter;
