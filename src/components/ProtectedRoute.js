import React, { useState, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const ProtectedRoute = () => {
  const [user, setUser] = useState(null);
  const [isPaid, setIsPaid] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const paymentStatus = userSnap.data().paymentStatus;
            setIsPaid(paymentStatus === "success");
          } else {
            setIsPaid(false);
          }
        } catch (error) {
          console.error("Error fetching payment status:", error);
          setIsPaid(false);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading || isPaid === null) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  // Redirect non-paid users trying to access "/digital-resume/:id"
  if (!isPaid && location.pathname.startsWith("/digital-resume")) {
    return <Navigate to="/resume-preview" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
