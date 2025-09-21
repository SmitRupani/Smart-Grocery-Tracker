import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

// Fetch groceries
export const fetchGroceries = createAsyncThunk("grocery/fetchGroceries", async () => {
  const res = await API.get("/grocery");
  return res.data;
});

// Add grocery
export const addGrocery = createAsyncThunk("grocery/addGrocery", async (item) => {
  // item should include: name, category, quantity, unit, expiryDate
  const res = await API.post("/grocery", item);
  return res.data;
});

// Update grocery
export const updateGrocery = createAsyncThunk("grocery/updateGrocery", async ({ id, data }) => {
  const res = await API.put(`/grocery/${id}`, data);
  return res.data;
});

// Delete grocery
export const deleteGrocery = createAsyncThunk("grocery/deleteGrocery", async (id) => {
  await API.delete(`/grocery/${id}`);
  return id;
});

const grocerySlice = createSlice({
  name: "grocery",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchGroceries.pending, (state) => { state.loading = true; })
      .addCase(fetchGroceries.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchGroceries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add
      .addCase(addGrocery.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Update
      .addCase(updateGrocery.fulfilled, (state, action) => {
        const idx = state.items.findIndex((item) => item._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      // Delete
      .addCase(deleteGrocery.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      });
  },
});

export default grocerySlice.reducer;
