import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

export const fetchGroceries = createAsyncThunk("groceries/fetchGroceries", async () => {
  const res = await API.get("/groceries");
  return res.data;
});

export const addGrocery = createAsyncThunk("groceries/addGrocery", async (item) => {
  const res = await API.post("/groceries", item);
  return res.data;
});

export const deleteGrocery = createAsyncThunk("groceries/deleteGrocery", async (id) => {
  await API.delete(`/groceries/${id}`);
  return id;
});

const grocerySlice = createSlice({
  name: "groceries",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroceries.fulfilled, (state, action) => { state.items = action.payload; })
      .addCase(addGrocery.fulfilled, (state, action) => { state.items.push(action.payload); })
      .addCase(deleteGrocery.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      });
  },
});

export default grocerySlice.reducer;
