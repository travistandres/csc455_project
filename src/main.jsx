import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./Login.jsx";
import Home from "./Home.jsx";
import Register from "./Register.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Login Page */}
        <Route path="/register" element={<Register />} /> {/* Register Page */}
        <Route path="/home" element={<Home />} /> {/* Home Page */}
      </Routes>
    </Router>
  </React.StrictMode>
);
