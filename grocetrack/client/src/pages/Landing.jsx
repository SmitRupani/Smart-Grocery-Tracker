import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white">
      <h1 className="text-5xl font-extrabold text-green-600 mb-4">
        Smart Grocery Tracker 🛒
      </h1>
      <p className="text-gray-600 text-lg mb-8 text-center max-w-md">
        Track your groceries, avoid waste, and get recipe
        suggestions based on what’s in your kitchen.
      </p>

      <div className="flex gap-4">
        <Link
          to="/register"
          className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="border border-green-500 text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition"
        >
          Login
        </Link>
      </div>

      <footer className="absolute bottom-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Smart Grocery Tracker. Built with ❤️ for college.
      </footer>
    </div>
  );
};

export default LandingPage;
