import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

// Fetch logged-in user
export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  const res = await API.get("/auth/me");
  return res.data;
});

// Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials) => {
    const res = await API.post("/auth/login", credentials);
    return res.data;
  }
);

// Register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData) => {
    const res = await API.post("/auth/register", userData);
    return res.data;
  }
);

// Logout
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  await API.post("/auth/logout");
  return null;
});

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (userData) => {
    const res = await API.put("/user/profile", userData, {
      withCredentials: true,
    });
    return res.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loginLoading: false,
    fetchUserLoading: false,
    updateProfileLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch user
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
      })
      // Login
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
        state.error = action.error.message;
      })
      // Register
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loginLoading = false;
        state.error = action.error.message;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
    // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.updateProfileLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updateProfileLoading = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.updateProfileLoading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
