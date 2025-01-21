import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./pages/Dashboard";
import { isAuthenticated } from "./utils/auth";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated() ? <Home /> : <Navigate to="/login" />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={isAuthenticated() ? <Dashboard /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
