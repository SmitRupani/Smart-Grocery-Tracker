import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin"], // admin could be for households
      default: "user",
    },
    preferences: {
      dietary: {
        type: String,
        enum: ["none", "vegetarian", "vegan", "halal", "kosher"],
        default: "none",
      },
    },
    householdId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Household", // optional future feature
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare entered password with hashed one
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
