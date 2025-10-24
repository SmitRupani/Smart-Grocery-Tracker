import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Please enter recipe title"],
    },
    ingredients: [
      {
        name: { type: String, required: true },
        quantity: { type: String }, // e.g. "2 cups", "200g"
      },
    ],
    instructions: {
      type: String,
      required: [true, "Please add cooking instructions"],
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Recipe", recipeSchema);
