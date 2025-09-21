import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import groceryReducer from "../slices/grocerySlice.js";
// import recipeReducer from "../slices/recipeSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    grocery: groceryReducer,
    // recipes: recipeReducer,
  },
});

export default store;
