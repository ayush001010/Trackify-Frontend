import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Account from "./pages/AccountPage";

const App = () => {
  const isAuth = !!localStorage.getItem("token");

  return (
    <>
      <Header />
      <div className="p-4">
        <Routes>
          <Route path="/" element={isAuth ? <Home /> : <Login />} />
          <Route path="/add" element={isAuth ? <AddTask /> : <Login />} />
          <Route path="/edit/:id" element={isAuth ? <EditTask /> : <Login />} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
