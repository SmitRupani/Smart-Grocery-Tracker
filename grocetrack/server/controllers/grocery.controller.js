import Grocery from "../models/grocery.model.js";

// @desc    Get all groceries for logged-in user
// @route   GET /api/groceries
export const getGroceries = async (req, res) => {
  try {
    const groceries = await Grocery.find({ user: req.user._id });
    res.json(groceries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add new grocery
// @route   POST /api/groceries
export const createGrocery = async (req, res) => {
  const { name, category, quantity, unit, expiryDate } = req.body;

  try {
    const grocery = await Grocery.create({
      user: req.user._id,
      name,
      category,
      quantity,
      unit,
      expiryDate,
    });

    res.status(201).json(grocery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update grocery
// @route   PUT /api/groceries/:id
export const updateGrocery = async (req, res) => {
  try {
    const grocery = await Grocery.findById(req.params.id);

    if (!grocery) {
      return res.status(404).json({ message: "Grocery not found" });
    }

    if (grocery.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedGrocery = await Grocery.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedGrocery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete grocery
// @route   DELETE /api/groceries/:id
export const deleteGrocery = async (req, res) => {
  try {
    const grocery = await Grocery.findById(req.params.id);

    if (!grocery) {
      return res.status(404).json({ message: "Grocery not found" });
    }

    if (grocery.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await grocery.deleteOne();
    res.json({ message: "Grocery removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
