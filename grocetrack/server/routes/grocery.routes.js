import express from "express";
import {
  createGrocery,
  getGroceries,
  updateGrocery,
  deleteGrocery,
} from "../controllers/grocery.controller.js";

import { protect } from "../middleware/authMiddleware.js";

const groceryRouter = express.Router();

// @route   GET /api/groceries
// @desc    Get all groceries for logged-in user
groceryRouter.get("/", protect, getGroceries);

// @route   POST /api/groceries
// @desc    Add new grocery item
groceryRouter.post("/", protect, createGrocery);

// @route   PUT /api/groceries/:id
// @desc    Update grocery item
groceryRouter.put("/:id", protect, updateGrocery);

// @route   DELETE /api/groceries/:id
// @desc    Delete grocery item
groceryRouter.delete("/:id", protect, deleteGrocery);

export default groceryRouter;
