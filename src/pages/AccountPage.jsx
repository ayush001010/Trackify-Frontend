import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Account() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    api
      .get("/account")
      .then((res) => {
        console.log("User API response:", res.data); // ✅ Debug line
        if (res.data && res.data.user) {
          setUser(res.data.user);
        } else {
          setError("User data not found.");
        }
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        setError("Failed to fetch user data.");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Your Account
        </h2>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-lg font-medium">{user?.name || "N/A"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-medium">{user?.email || "N/A"}</p>
          </div>

          <button
            onClick={handleLogout}
            className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
