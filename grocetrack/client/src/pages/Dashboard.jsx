import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroceries } from "../slices/grocerySlice";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.grocery);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(fetchGroceries());
  }, [dispatch]);

  const totalItems = items.length;

  const expiringSoonItems = items.filter((item) => {
    const today = new Date();
    const exp = new Date(item.expiryDate);
    const diff = (exp - today) / (1000 * 60 * 60 * 24);
    return diff <= 3;
  });

  const lowStockItems = items.filter((item) => item.quantity <= 2);

  const categoryData = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(categoryData).map((key) => ({
    name: key,
    value: categoryData[key],
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF4567", "#775DD0", "#546E7A"];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">
        Hi {user?.name || "there"} 👋
      </h2>
      <p className="text-gray-600 mb-6">Here’s your grocery summary:</p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-100 p-4 rounded-lg shadow text-center">
          <p className="text-lg font-semibold">Total Items</p>
          <p className="text-2xl font-bold">{totalItems}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg shadow text-center">
          <p className="text-lg font-semibold">Expiring Soon</p>
          <p className="text-2xl font-bold">{expiringSoonItems.length}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow text-center">
          <p className="text-lg font-semibold">Low Stock</p>
          <p className="text-2xl font-bold">{lowStockItems.length}</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white shadow rounded-lg p-4 h-80 mb-8">
        <h3 className="text-xl font-semibold mb-4">Groceries by Category</h3>
        {chartData.length === 0 ? (
          <p className="text-center text-gray-500">No items to display.</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Urgent Items */}
      <div className="bg-white shadow rounded-lg p-4 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-red-600">
          ⚠️ Urgent: Expiring Soon
        </h3>
        {expiringSoonItems.length === 0 ? (
          <p className="text-gray-500">No items are expiring soon 🎉</p>
        ) : (
          <ul className="space-y-2">
            {expiringSoonItems
              .sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate))
              .map((item) => (
                <li
                  key={item._id}
                  className="flex justify-between items-center border p-2 rounded-lg bg-red-50"
                >
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.quantity} {item.unit} • {item.category}
                    </p>
                  </div>
                  <span className="text-red-700 font-semibold">
                    Expires: {new Date(item.expiryDate).toLocaleDateString()}
                  </span>
                </li>
              ))}
          </ul>
        )}
      </div>

      {/* Low Stock Items */}
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-xl font-semibold mb-4 text-yellow-600">
          🟡 Low Stock Items
        </h3>
        {lowStockItems.length === 0 ? (
          <p className="text-gray-500">No items are low on stock 🎉</p>
        ) : (
          <ul className="space-y-2">
            {lowStockItems
              .sort((a, b) => a.quantity - b.quantity)
              .map((item) => (
                <li
                  key={item._id}
                  className="flex justify-between items-center border p-2 rounded-lg bg-yellow-50"
                >
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.quantity} {item.unit} • {item.category}
                    </p>
                  </div>
                  <span className="text-yellow-700 font-semibold">
                    Only {item.quantity} left
                  </span>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
