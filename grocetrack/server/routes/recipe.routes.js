import express from "express";
import {
  getRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipesFromAPI,
} from "../controllers/recipe.controller.js";

import { protect } from "../middleware/authMiddleware.js";

const RecipeRouter = express.Router();

RecipeRouter.route("/")
  .get(protect, getRecipes)
  .post(protect, createRecipe);

RecipeRouter.route("/:id")
  .put(protect, updateRecipe)
  .delete(protect, deleteRecipe);

RecipeRouter.get("/from-api", protect, getRecipesFromAPI);

export default RecipeRouter;
