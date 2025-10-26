import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AuthRoute;
