import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      await dispatch(logoutUser());
      navigate("/login");
    };
    doLogout();
  }, [dispatch, navigate]);

  return <p className="text-center mt-10">Logging out...</p>;
};

export default Logout;
