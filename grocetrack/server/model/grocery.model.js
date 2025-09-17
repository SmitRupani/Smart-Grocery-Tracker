import mongoose from "mongoose";

const grocerySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // groceries belong to a user
    },
    name: {
      type: String,
      required: [true, "Please enter the grocery name"],
    },
    category: {
      type: String,
      enum: ["fruits", "vegetables", "dairy", "meat", "pantry", "frozen", "other"],
      default: "other",
    },
    quantity: {
      type: Number,
      default: 1,
    },
    unit: {
      type: String,
      enum: ["pcs", "kg", "g", "liters", "ml", "packs"],
      default: "pcs",
    },
    expiryDate: {
      type: Date,
      required: [true, "Please provide an expiry date"],
    },
    consumed: {
      type: Boolean,
      default: false,
    },
    lowStock: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      type: String, // Cloudinary/AWS S3 link if uploaded
    },
  },
  { timestamps: true }
);

export default mongoose.model("Grocery", grocerySchema);
