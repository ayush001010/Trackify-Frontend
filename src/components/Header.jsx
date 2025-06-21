import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const isAuth = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>
        Task Manager
      </h1>
      <nav className="space-x-4">
        {isAuth ? (
          <>
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/add" className="hover:underline">Add Task</Link>
            <button
              onClick={handleLogout}
              className="hover:underline text-red-400 ml-2"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
