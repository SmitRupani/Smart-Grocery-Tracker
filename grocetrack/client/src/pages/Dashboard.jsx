import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user?.name} 👋</h2>
      <p>This is your Smart Grocery dashboard.</p>
    </div>
  );
};

export default Dashboard;
