import axios from "axios";
import Recipe from "../models/recipe.model.js";

// @desc    Get all recipes
// @route   GET /api/recipes
export const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ user: req.user._id });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new recipe
// @route   POST /api/recipes
export const createRecipe = async (req, res) => {
  const { title, ingredients, instructions, imageUrl } = req.body;

  try {
    const recipe = await Recipe.create({
      user: req.user._id,
      title,
      ingredients,
      instructions,
      imageUrl,
    });

    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update recipe
// @route   PUT /api/recipes/:id
export const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (recipe.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete recipe
// @route   DELETE /api/recipes/:id
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (recipe.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await recipe.deleteOne();
    res.json({ message: "Recipe removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get recipes from Spoonacular API based on groceries
// @route GET /api/recipes/from-api
// @access Private
export const getRecipesFromAPI = async (req, res) => {
  try {
    const { ingredients } = req.query; // e.g. "tomato,cheese,egg"
    const apiKey = process.env.SPOONACULAR_API_KEY;

    if (!ingredients) {
      return res.status(400).json({ message: "Ingredients are required" });
    }

    const response = await axios.get(
      "https://api.spoonacular.com/recipes/findByIngredients",
      {
        params: {
          ingredients,
          number: 6, // number of recipes to return
          apiKey,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Spoonacular Error:", error.message);
    res.status(500).json({ message: "Failed to fetch recipes" });
  }
};

