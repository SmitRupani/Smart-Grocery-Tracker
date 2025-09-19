import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">Smart Grocery Tracker</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Dashboard</Link>
        <Link to="/login" className="hover:underline">Login</Link>
        <Link to="/register" className="hover:underline">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
