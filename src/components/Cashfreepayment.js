import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { load } from "@cashfreepayments/cashfree-js";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "./firebase"; // Firestore instance
import { Box, Button, Typography } from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const CashfreePayment = () => {
  const [loading, setLoading] = useState(false);
  const [cashfree, setCashfree] = useState(null);
  const [orderId, setOrderId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Get Authenticated User Safely
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ Initialize Cashfree SDK once
  useEffect(() => {
    const initializeSDK = async () => {
      try {
        const cashfreeInstance = await load({ mode: "production" }); // or "production"
        setCashfree(cashfreeInstance);
        console.log("✅ Cashfree SDK Loaded");
      } catch (err) {
        console.error("❌ Failed to Load Cashfree SDK:", err);
      }
    };

    initializeSDK();
  }, []);

  // ✅ Updates Firestore when payment status changes
  useEffect(() => {
    const updatePaymentStatus = async () => {
      if (!user || !paymentStatus) return;
      console.log("🔄 Updating Payment Status in Firestore");

      const userRef = doc(db, "users", user.uid);
      try {
        await setDoc(
          userRef,
          {
            paymentStatus: paymentStatus,
            paymentTimestamp: new Date(),
          },
          { merge: true }
        );
        console.log("✅ Payment Status Updated in Firestore");
      } catch (error) {
        console.error("❌ Error updating payment status:", error);
      }
    };

    updatePaymentStatus();
  }, [paymentStatus, user]);

  // ✅ Handle Payment
  const handlePayment = async () => {
    setLoading(true);
    setPaymentStatus(null);

    try {
      const orderID = `ORDER_${Date.now()}`;
      setOrderId(orderID);

      const response = await fetch(`${process.env.REACT_APP_PAYMENT_URL}/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: orderID,
          orderAmount: 100,
          customerName: user?.displayName || "John Doe",
          customerEmail: user?.email || "johndoe@example.com",
          customerPhone: "9999999999",
        }),
      });

      if (!response.ok) {
        throw new Error(`❌ Server Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("🔄 API Response:", data);

      if (!data.payment_session_id) {
        throw new Error("❌ Payment session ID not received");
      }

      const sessionId = data.payment_session_id;
      console.log("✅ Payment Session ID:", sessionId);

      if (!cashfree) {
        throw new Error("❌ Cashfree SDK not initialized");
      }

      await cashfree.checkout({
        paymentSessionId: sessionId,
        redirectTarget: "_modal",
      });

      console.log("✅ Payment Initiated");
      pollPaymentStatus(orderID);

    } catch (err) {
      console.error("❌ Payment Error:", err);
      setPaymentStatus("error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Verify Payment & Polling
  const pollPaymentStatus = async (orderID) => {
    let attempts = 0;
    const maxAttempts = 6; // Try for ~30 seconds

    while (attempts < maxAttempts) {
      try {
        const response = await fetch(`${process.env.REACT_APP_PAYMENT_URL}/verify-payment/${orderID}`);
        if (!response.ok) {
          throw new Error(`❌ Server Error: ${response.status}`);
        }

        const data = await response.json();
        console.log("🔍 Payment Status Check:", data);

        if (data.status === "success") {
          setPaymentStatus("success");
          navigate("/digital-resume/1");
          return;
        } else if (data.status === "failed") {
          setPaymentStatus("failed");
          return;
        }

      } catch (error) {
        console.error("❌ Error checking payment:", error);
        setPaymentStatus("error");
      }

      attempts++;
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  };

  return (
    <>
        {loading ? "Processing..." : <>
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
        </>}

      {paymentStatus === "success" && (
        <div style={{ color: "green", marginTop: "20px" }}>
          ✅ Payment Successful! Thank you for your purchase.
        </div>
      )}

      {paymentStatus === "failed" && (
        <div style={{ color: "red", marginTop: "20px" }}>
          ❌ Payment Failed. Please try again.
        </div>
      )}

      {paymentStatus === "pending" && (
        <div style={{ color: "orange", marginTop: "20px" }}>
          ⏳ Payment is pending. Please wait for confirmation.
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
