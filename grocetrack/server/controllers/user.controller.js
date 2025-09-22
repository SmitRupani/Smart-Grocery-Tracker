// controllers/userController.js
import bcrypt from "bcrypt";
import User from "../models/user.model.js";

export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.newPassword) {
        // Verify current password
        if (!req.body.currentPassword) {
          return res.status(400).json({ message: "Current password required" });
        }

        const isMatch = await bcrypt.compare(req.body.currentPassword, user.password);
        if (!isMatch) {
          return res.status(401).json({ message: "Current password is incorrect" });
        }

        user.password = req.body.newPassword;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
