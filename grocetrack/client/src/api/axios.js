import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api", // backend server
  withCredentials: true, // 👈 important for cookies
});

export default API;
