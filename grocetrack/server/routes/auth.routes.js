import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";

const authRouter = express.Router();

// @route   POST /api/auth/register
authRouter.post("/register", registerUser);

// @route   POST /api/auth/login
authRouter.post("/login", loginUser);

export default authRouter;
