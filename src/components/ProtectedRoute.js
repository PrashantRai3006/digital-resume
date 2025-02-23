import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "./firebase"; // Import Firebase Auth
import { onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        console.log("currentUser", currentUser);
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
