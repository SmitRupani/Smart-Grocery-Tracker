import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1].trim();
      console.log("🔑 Token received:", token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("✅ Decoded:", decoded);

      req.user = await User.findById(decoded.id).select("-password");
      console.log("👤 User found:", req.user);

      next();
    } catch (error) {
      console.error("❌ JWT Verify Error:", error.message);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
