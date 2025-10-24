import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

// Fetch all recipes from DB
export const fetchRecipes = createAsyncThunk("recipes/fetchAll", async () => {
  const res = await API.get("/recipes");
  return res.data;
});

// Add a recipe
export const addRecipe = createAsyncThunk("recipes/add", async (recipe) => {
  const res = await API.post("/recipes", recipe);
  return res.data;
});

// Update a recipe
export const updateRecipe = createAsyncThunk("recipes/update", async ({ id, data }) => {
  const res = await API.put(`/recipes/${id}`, data);
  return res.data;
});

// Delete a recipe
export const deleteRecipe = createAsyncThunk("recipes/delete", async (id) => {
  await API.delete(`/recipes/${id}`);
  return id;
});

// Fetch recipes from external API based on ingredients
export const fetchRecipesFromAPI = createAsyncThunk(
  "recipes/fetchFromAPI",
  async (ingredients) => {
    const res = await API.get(`/recipes/from-api?ingredients=${ingredients}`);
    return res.data;
  }
);

const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    items: [],        // user recipes (DB)
    suggestions: [],  // API recipes
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch user recipes
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add
      .addCase(addRecipe.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // Update
      .addCase(updateRecipe.fulfilled, (state, action) => {
        const idx = state.items.findIndex((r) => r._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      })

      // Delete
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.items = state.items.filter((r) => r._id !== action.payload);
      })

      // Fetch suggestions from API
      .addCase(fetchRecipesFromAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecipesFromAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestions = action.payload; // keep them separate
      })
      .addCase(fetchRecipesFromAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default recipeSlice.reducer;
