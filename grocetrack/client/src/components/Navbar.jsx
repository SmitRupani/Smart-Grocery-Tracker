import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, loading } = useSelector((state) => state.auth);

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <h1 className="text-xl font-bold">Smart Grocery</h1>
      <div>
        {loading ? (
          <span>Loading...</span>
        ) : user ? (
          <>
            <span className="mr-4">Hi, {user.name}</span>
            <Link to="/dashboard" className="mr-4 hover:underline">
              Dashboard
            </Link>
            <Link to="/logout" className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4 hover:underline">
              Login
            </Link>
            <Link to="/register" className="bg-green-500 px-3 py-1 rounded hover:bg-green-600">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
