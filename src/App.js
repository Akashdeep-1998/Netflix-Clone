import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AuthContext from "./Context/AuthContext";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Account from "./components/Account";
import ProtectedRoutes from "./components/ProtectedRoute";
import MovieDetail from "./components/MovieDetail";

const App = () => {
  return (
    <>
      <AuthContext>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route
            path="account"
            element={
              <ProtectedRoutes>
                <Account />
              </ProtectedRoutes>
            }
          />

          <Route
            path="movie"
            element={
              <ProtectedRoutes>
                <MovieDetail />
              </ProtectedRoutes>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthContext>
    </>
  );
};

export default App;
