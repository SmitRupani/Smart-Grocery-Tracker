import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroceries, addGrocery, updateGrocery, deleteGrocery } from "../slices/grocerySlice";

const Grocery = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.grocery);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("other");
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("pcs");
  const [expiryDate, setExpiryDate] = useState("");

  useEffect(() => {
    dispatch(fetchGroceries());
  }, [dispatch]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name || !expiryDate) return; // expiryDate required
    dispatch(addGrocery({ name, category, quantity, unit, expiryDate }));
    setName("");
    setCategory("other");
    setQuantity(1);
    setUnit("pcs");
    setExpiryDate("");
  };

  const handleDelete = (id) => dispatch(deleteGrocery(id));

  const handleUpdateQuantity = (id, newQty) => {
    dispatch(updateGrocery({ id, data: { quantity: newQty } }));
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Grocery List 🛒</h2>

      <form onSubmit={handleAdd} className="mb-4 space-y-2">
        <input
          type="text"
          placeholder="Item name"
          className="border p-2 rounded w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex gap-2">
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded flex-1">
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
            className="border p-2 rounded w-20"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />

          <select value={unit} onChange={(e) => setUnit(e.target.value)} className="border p-2 rounded w-24">
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
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
          Add Item
        </button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p>No items yet. Add something!</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item._id} className="flex justify-between items-center bg-white shadow p-2 rounded">
              <span>
                {item.name} ({item.quantity} {item.unit}) - {item.category} - Exp: {new Date(item.expiryDate).toLocaleDateString()}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                >
                  +
                </button>
                <button
                  onClick={() => handleUpdateQuantity(item._id, Math.max(1, item.quantity - 1))}
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Grocery;
