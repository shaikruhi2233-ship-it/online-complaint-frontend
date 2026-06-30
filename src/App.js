import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ComplaintPage from "./pages/ComplaintPage";
import ComplaintListPage from "./pages/ComplaintListPage";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import Feedback from "./pages/Feedback";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/complaint"
          element={
            <PrivateRoute>
              <ComplaintPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/complaints"
          element={
            <PrivateRoute>
              <ComplaintListPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/feedback"
          element={
            <PrivateRoute>
              <Feedback />
            </PrivateRoute>
          }
        />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;