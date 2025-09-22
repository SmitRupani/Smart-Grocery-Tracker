import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroceries, addGrocery, updateGrocery, deleteGrocery } from "../slices/grocerySlice";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const Grocery = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.grocery);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("other");
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("pcs");
  const [expiryDate, setExpiryDate] = useState("");
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(fetchGroceries());
  }, [dispatch]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name || !expiryDate) {
      toast.error("Name and expiry date are required!");
      return;
    }

    dispatch(addGrocery({ name, category, quantity, unit, expiryDate }))
      .unwrap()
      .then(() => {
        toast.success("Item added!");
        setName("");
        setCategory("other");
        setQuantity(1);
        setUnit("pcs");
        setExpiryDate("");
        setShowForm(false); // Hide form after adding
      })
      .catch(() => toast.error("Failed to add item"));
  };

  const handleDelete = (id) => {
    dispatch(deleteGrocery(id))
      .unwrap()
      .then(() => toast.success("Item deleted!"))
      .catch(() => toast.error("Failed to delete item"));
  };

  const handleUpdate = (id, newQty) => {
    if (newQty < 1) return;
    dispatch(updateGrocery({ id, data: { quantity: newQty } }))
      .unwrap()
      .then(() => toast.success("Quantity updated"))
      .catch(() => toast.error("Failed to update item"));
  };

  const isNearExpiry = (date) => {
    const today = new Date();
    const exp = new Date(date);
    const diff = (exp - today) / (1000 * 60 * 60 * 24);
    return diff <= 3;
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === "all" || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Toaster position="top-right" />
      <h2 className="text-3xl font-bold mb-6 text-center">My Grocery List 🛒</h2>

      {/* Search + Filter + Add Button */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 items-center">
        <input
          type="text"
          placeholder="Search items..."
          className="border p-2 rounded flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="fruits">Fruits</option>
          <option value="vegetables">Vegetables</option>
          <option value="dairy">Dairy</option>
          <option value="meat">Meat</option>
          <option value="pantry">Pantry</option>
          <option value="frozen">Frozen</option>
          <option value="other">Other</option>
        </select>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {showForm ? "Close Form" : "+ Add Item"}
        </button>
      </div>

      {/* Add Form (only visible when toggled) */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            onSubmit={handleAdd}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-3 mb-6 bg-white shadow-md p-4 rounded-lg overflow-hidden"
          >
            <input
              type="text"
              placeholder="Item name"
              className="border p-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div className="flex gap-2">
              <select
                className="border p-2 rounded flex-1"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="fruits">Fruits</option>
                <option value="vegetables">Vegetables</option>
                <option value="dairy">Dairy</option>
                <option value="meat">Meat</option>
                <option value="pantry">Pantry</option>
                <option value="frozen">Frozen</option>
                <option value="other">Other</option>
              </select>

              <input
                type="number"
                min="1"
                className="border p-2 rounded w-24"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />

              <select
                className="border p-2 rounded w-28"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              >
                <option value="pcs">pcs</option>
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="liters">liters</option>
                <option value="ml">ml</option>
                <option value="packs">packs</option>
              </select>
            </div>

            <input
              type="date"
              className="border p-2 rounded"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />

            <button
              type="submit"
              className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Save Item
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Items */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : filteredItems.length === 0 ? (
        <p className="text-center">No items match your search/filter.</p>
      ) : (
        <ul className="space-y-3">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.li
                key={item._id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.2 }}
                className={`flex justify-between items-center shadow p-3 rounded-lg 
                  ${isNearExpiry(item.expiryDate) ? "border border-red-400 bg-red-50" : "bg-white"} 
                  ${item.quantity <= 2 ? "border-yellow-400 bg-yellow-50" : ""}`}
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    {item.quantity} {item.unit} • {item.category} • Expires:{" "}
                    {new Date(item.expiryDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(item._id, item.quantity + 1)}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleUpdate(item._id, item.quantity - 1)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    X
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
};

export default Grocery;
