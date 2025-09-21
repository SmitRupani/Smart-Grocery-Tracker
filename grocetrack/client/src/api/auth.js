import API from "./axios";

// Register
export const registerUser = async (data) => {
  const res = await API.post("/auth/register", data);
  return res.data; // { user }
};

// Login
export const loginUser = async (data) => {
  const res = await API.post("/auth/login", data);
  return res.data; // { user }
};

// Logout
export const logoutUser = async () => {
  const res = await API.post("/auth/logout");
  return res.data;
};

// Get current user (useful for persistence on refresh)
export const getCurrentUser = async () => {
  const res = await API.get("/auth/me"); // you’ll need to add this route
  return res.data;
};
