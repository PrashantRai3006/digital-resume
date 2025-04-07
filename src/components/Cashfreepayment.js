import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { load } from "@cashfreepayments/cashfree-js";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "./firebase";
import { Box, Button, Typography } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";

const CashfreePayment = () => {
  const [loading, setLoading] = useState(false);
  const [cashfree, setCashfree] = useState(null);
  const [orderId, setOrderId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Get Authenticated User
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Load Cashfree SDK in Production Mode
  useEffect(() => {
    const initializeSDK = async () => {
      try {
        const cashfreeInstance = await load({
          mode: "production", // 👈 CHANGED from "sandbox" to "production"
        });
        setCashfree(cashfreeInstance);
        console.log("✅ Cashfree SDK Loaded (PROD)");
      } catch (err) {
        console.error("❌ Failed to load Cashfree SDK:", err);
      }
    };

    initializeSDK();
  }, []);

  // ✅ Update Firestore with payment status
  useEffect(() => {
    const updatePaymentStatus = async () => {
      if (!user || !paymentStatus) return;

      const userRef = doc(db, "users", user.uid);
      try {
        await setDoc(
          userRef,
          {
            paymentStatus,
            paymentTimestamp: new Date(),
          },
          { merge: true }
        );
        console.log("✅ Payment status updated in Firestore");
      } catch (err) {
        console.error("❌ Firestore update failed:", err);
      }
    };

    updatePaymentStatus();
  }, [paymentStatus, user]);

  const handlePayment = async () => {
    setLoading(true);
    setPaymentStatus(null);

    try {
      const orderID = `ORDER_${Date.now()}`;
      setOrderId(orderID);

      const response = await fetch(
        `${process.env.REACT_APP_PAYMENT_URL}/create-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: orderID,
            orderAmount: 1,
            customerName: user?.displayName || "John Doe",
            customerEmail: user?.email || "johndoe@example.com",
            customerPhone: "9999999999",
          }),
        }
      );

      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();

      if (!data.payment_session_id) throw new Error("No session ID");

      const sessionId = data.payment_session_id;

      if (!cashfree) throw new Error("SDK not initialized");

      await cashfree.checkout({
        paymentSessionId: sessionId,
        redirectTarget: "_modal",
      });

      pollPaymentStatus(orderID);
    } catch (err) {
      console.error("❌ Payment error:", err);
      setPaymentStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const pollPaymentStatus = async (orderID) => {
    let attempts = 0;
    const maxAttempts = 6;

    while (attempts < maxAttempts) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_PAYMENT_URL}/verify-payment/${orderID}`
        );
        const data = await response.json();

        if (data.status === "success") {
          setPaymentStatus("success");
          navigate("/digital-resume/1");
          return;
        } else if (data.status === "failed") {
          setPaymentStatus("failed");
          return;
        }
      } catch (err) {
        console.error("❌ Polling error:", err);
        setPaymentStatus("error");
      }

      attempts++;
      await new Promise((res) => setTimeout(res, 5000));
    }
  };

  return (
    <>
      {loading ? (
        "Processing..."
      ) : (
        <>
          <Typography variant="h5" color="white" fontWeight="bold" mb={2}>
            Unlock Your Resume
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handlePayment}
            disabled={loading || !cashfree}
          >
            Proceed to Payment
          </Button>
        </>
      )}

      {paymentStatus === "success" && (
        <div style={{ color: "green", marginTop: "20px" }}>
          ✅ Payment Successful! Thank you.
        </div>
      )}

      {paymentStatus === "failed" && (
        <div style={{ color: "red", marginTop: "20px" }}>
          ❌ Payment Failed. Please try again.
        </div>
      )}

      {paymentStatus === "pending" && (
        <div style={{ color: "orange", marginTop: "20px" }}>
          ⏳ Payment Pending. Please wait.
        </div>
      )}

      {paymentStatus === "error" && (
        <div style={{ color: "orange", marginTop: "20px" }}>
          ⚠️ Error verifying payment. Contact support.
        </div>
      )}
    </>
  );
};

export default CashfreePayment;
