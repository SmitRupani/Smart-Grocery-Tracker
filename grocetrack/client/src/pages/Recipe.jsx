import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRecipes,
  addRecipe,
  deleteRecipe,
  updateRecipe,
  fetchRecipesFromAPI,
} from "../slices/recipeSlice.js";
import { toast, Toaster } from "react-hot-toast";

const Recipes = () => {
  const dispatch = useDispatch();

  const {
    items,
    suggestions = [],
    loading,
    error,
  } = useSelector((state) => state.recipes);

  const groceries = useSelector((state) => state.grocery?.items ?? []);

  const [form, setForm] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    imageUrl: "",
  });
  const [selected, setSelected] = useState(null);

  // Fetch saved recipes from backend
  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  // Fetch API-based recipe suggestions using current groceries
  useEffect(() => {
    if (groceries.length > 0) {
      const ingredientNames = groceries.map((g) => g.name).join(",");
      dispatch(fetchRecipesFromAPI(ingredientNames));
    }
  }, [groceries, dispatch]);

  // Add recipe
  const handleSubmit = (e) => {
    e.preventDefault();
    const recipe = {
      title: form.title.trim(),
      ingredients: form.ingredients
        .split(",")
        .map((i) => ({ name: i.trim() }))
        .filter((i) => i.name !== ""),
      instructions: form.instructions.trim(),
      imageUrl: form.imageUrl.trim(),
    };

    if (!recipe.title || !recipe.ingredients.length || !recipe.instructions) {
      toast.error("Please fill in all fields");
      return;
    }

    dispatch(addRecipe(recipe))
      .unwrap()
      .then(() => toast.success("Recipe added!"))
      .catch(() => toast.error("Failed to add recipe"));
    setForm({ title: "", ingredients: "", instructions: "", imageUrl: "" });
  };

  // Update recipe
  const handleUpdate = () => {
    const updated = {
      title: selected.title.trim(),
      ingredients: selected.ingredients,
      instructions: selected.instructions.trim(),
      imageUrl: selected.imageUrl.trim(),
    };

    if (
      !updated.title ||
      updated.ingredients[0].name === "" ||
      !updated.instructions
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    dispatch(updateRecipe({ id: selected._id, data: updated }))
      .unwrap()
      .then(() => toast.success("Recipe updated!"))
      .catch(() => toast.error("Update failed"));
    setSelected(null);
  };

  return (
    <div className="p-6">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold mb-4">Recipes</h2>

      {/* Add Recipe Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Recipe Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Ingredients (comma separated)"
          value={form.ingredients}
          onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Instructions"
          value={form.instructions}
          onChange={(e) => setForm({ ...form, instructions: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Add Recipe
        </button>
      </form>

      {loading && <p>Loading recipes...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* My Recipes */}
      <h3 className="text-xl font-semibold mt-6 mb-3">My Recipes</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.length === 0 && <p>No recipes saved yet.</p>}
        {items.map((recipe) => (
          <div
            key={recipe._id}
            className="border rounded-lg shadow hover:shadow-lg transition"
          >
            <img
              src={
                recipe.imageUrl ||
                "https://via.placeholder.com/400x200?text=No+Image"
              }
              alt={recipe.title}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{recipe.title}</h3>
              <p className="text-sm text-gray-600">
                {recipe.ingredients
                  .map((i) => i.name)
                  .join(", ")
                  .slice(0, 50)}
                ...
              </p>
              <div className="flex justify-between mt-3">
                <button
                  onClick={() => setSelected(recipe)}
                  className="text-blue-500 hover:underline"
                >
                  View
                </button>
                <button
                  onClick={() =>
                    dispatch(deleteRecipe(recipe._id))
                      .unwrap()
                      .then(() => toast.success("Recipe deleted!"))
                      .catch(() => toast.error("Delete failed"))
                  }
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🌐 Suggested Recipes (from Spoonacular API) */}
      <h3 className="text-xl font-semibold mt-8 mb-3">Suggested Recipes</h3>

      {suggestions.length === 0 && (
        <p className="text-gray-600 italic">
          No suggestions yet. Add groceries to see ideas!
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suggestions.map((recipe) => (
          <div
            key={recipe.id}
            className="border rounded-2xl shadow-md hover:shadow-xl transition bg-white overflow-hidden flex flex-col"
          >
            <img
              src={
                recipe.image ||
                "https://via.placeholder.com/400x200?text=No+Image"
              }
              alt={recipe.title}
              className="w-full h-44 object-cover"
            />

            <div className="p-4 flex flex-col flex-grow">
              <h3 className="font-semibold text-lg mb-2">{recipe.title}</h3>

              {/* ✅ Ingredient badges */}
              <div className="flex flex-wrap gap-1 mb-3">
                {recipe.usedIngredients?.map((ing) => (
                  <span
                    key={ing.id}
                    className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full"
                  >
                    ✅ {ing.name}
                  </span>
                ))}
                {recipe.missedIngredients?.map((ing) => (
                  <span
                    key={ing.id}
                    className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full"
                  >
                    ❌ {ing.name}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex justify-between items-center">
                <button
                  onClick={() => setSelected(recipe)}
                  className="text-blue-500 hover:underline text-sm"
                >
                  View Details
                </button>
                <button
                  onClick={() => {
                    const newRecipe = {
                      title: recipe.title,
                      ingredients: [
                        ...(recipe.usedIngredients?.map((i) => ({
                          name: i.name,
                        })) || []),
                        ...(recipe.missedIngredients?.map((i) => ({
                          name: i.name,
                        })) || []),
                      ],
                      instructions:
                        recipe.instructions || "No instructions available.",
                      imageUrl: recipe.image,
                    };

                    dispatch(addRecipe(newRecipe))
                      .unwrap()
                      .then(() =>
                        toast.success("Recipe saved to My Recipes 🎉")
                      )
                      .catch(() => toast.error("Failed to save recipe ❌"));
                  }}
                  className="bg-green-500 text-white text-sm px-3 py-1 rounded hover:bg-green-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🧾 View Details Modal (for Spoonacular API recipes) */}
      {selected && selected.id && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 shadow-lg overflow-y-auto max-h-[80vh]">
            <img
              src={selected.image}
              alt={selected.title}
              className="w-full h-56 object-cover rounded mb-4"
            />
            <h3 className="text-2xl font-bold mb-3">{selected.title}</h3>

            <h4 className="font-semibold mb-2">Ingredients:</h4>
            <ul className="list-disc list-inside mb-4">
              {[
                ...(selected?.usedIngredients || []),
                ...(selected?.missedIngredients || []),
              ].map((i) => (
                <li key={i.id}>{i.name}</li>
              ))}
            </ul>

            <h4 className="font-semibold mb-2">Instructions:</h4>
            <p className="text-gray-700 mb-4">
              {selected.instructions || "No instructions provided."}
            </p>

            <div className="flex justify-end">
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 📝 Edit Modal (for saved recipes) */}
      {selected && selected._id && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2">
            <h3 className="text-xl font-bold mb-2">Edit Recipe</h3>

            <input
              type="text"
              value={selected.title}
              onChange={(e) =>
                setSelected({ ...selected, title: e.target.value })
              }
              className="w-full border p-2 rounded mb-2"
            />

            <textarea
              value={selected?.ingredients?.map((i) => i.name).join(", ") || ""}
              onChange={(e) =>
                setSelected({
                  ...selected,
                  ingredients: e.target.value
                    .split(",")
                    .map((ing) => ({ name: ing.trim() })),
                })
              }
              className="w-full border p-2 rounded mb-2"
            />

            <textarea
              value={selected.instructions || ""}
              onChange={(e) =>
                setSelected({ ...selected, instructions: e.target.value })
              }
              className="w-full border p-2 rounded mb-2"
            />

            <input
              type="text"
              value={selected.imageUrl || ""}
              onChange={(e) =>
                setSelected({ ...selected, imageUrl: e.target.value })
              }
              className="w-full border p-2 rounded mb-2"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipes;
