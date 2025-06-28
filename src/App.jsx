import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Account from "./pages/AccountPage";

const App = () => {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  // Sync auth state when token is updated in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuth(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Optional: watch token on every navigation
  useEffect(() => {
    setIsAuth(!!localStorage.getItem("token"));
  }, [window.location.pathname]);

  return (
    <>
      <Header />
      <div className="p-4">
        <Routes>
          <Route path="/" element={isAuth ? <Home /> : <Login />} />
          <Route path="/add" element={isAuth ? <AddTask /> : <Login />} />
          <Route path="/edit/:id" element={isAuth ? <EditTask /> : <Login />} />
          <Route path="/account" element={isAuth ? <Account /> : <Login />} />
          <Route path="/login" element={!isAuth ? <Login /> : <Home />} />
          <Route path="/register" element={!isAuth ? <Register /> : <Home />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
