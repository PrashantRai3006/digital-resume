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

  const MODE = process.env.REACT_APP_PAYMENT_MODE || "production"; // "sandbox" or "production"
  const PAYMENT_URL = process.env.REACT_APP_PAYMENT_URL;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) setUser(u);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const initializeSDK = async () => {
      try {
        const instance = await load({ mode: MODE });
        setCashfree(instance);
        console.log("✅ Cashfree SDK Loaded in", MODE.toUpperCase(), "mode");
      } catch (err) {
        console.error("❌ Failed to Load Cashfree SDK:", err);
      }
    };
    initializeSDK();
  }, [MODE]);

  useEffect(() => {
    if (!user || !paymentStatus) return;

    const updatePaymentStatus = async () => {
      try {
        const userRef = doc(db, "users", user.uid);
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
        console.error("❌ Error updating Firestore:", error);
      }
    };

    updatePaymentStatus();
  }, [paymentStatus, user]);

  const handlePayment = async () => {
    setLoading(true);
    setPaymentStatus(null);

    try {
      const generatedOrderId = `ORDER_${Date.now()}`;
      setOrderId(generatedOrderId);

      const response = await fetch(`${PAYMENT_URL}/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: generatedOrderId,
          orderAmount: 1,
          customerName: user?.displayName || "John Doe",
          customerEmail: user?.email || "johndoe@example.com",
          customerPhone: "9999999999",
        }),
      });

      if (!response.ok) throw new Error(`❌ Server Error: ${response.status}`);
      const data = await response.json();

      if (!data.payment_session_id) throw new Error("❌ No session ID returned");

      const sessionId = data.payment_session_id;
      console.log("✅ Session ID Received:", sessionId);

      if (!cashfree) throw new Error("❌ Cashfree SDK not initialized");

      await cashfree.checkout({
        paymentSessionId: sessionId,
        redirectTarget: "_modal",
      });

      console.log("✅ Payment Modal Opened");
      pollPaymentStatus(generatedOrderId);
    } catch (err) {
      console.error("❌ Payment Error:", err);
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
        const response = await fetch(`${PAYMENT_URL}/verify-payment/${orderID}`);
        if (!response.ok) throw new Error(`❌ Server Error: ${response.status}`);

        const data = await response.json();
        console.log("🔍 Poll Result:", data);

        if (data.status === "success") {
          setPaymentStatus("success");
          navigate("/digital-resume/1");
          return;
        } else if (data.status === "failed") {
          setPaymentStatus("failed");
          return;
        }
      } catch (error) {
        console.error("❌ Polling Error:", error);
        setPaymentStatus("error");
        return;
      }

      attempts++;
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  };

  return (
    <Box textAlign="center">
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
        {loading ? "Processing..." : "Proceed to Payment"}
      </Button>

      {paymentStatus === "success" && (
        <Typography color="green" mt={2}>
          ✅ Payment Successful! Thank you.
        </Typography>
      )}

      {paymentStatus === "failed" && (
        <Typography color="red" mt={2}>
          ❌ Payment Failed. Please try again.
        </Typography>
      )}

      {paymentStatus === "pending" && (
        <Typography color="orange" mt={2}>
          ⏳ Payment pending. Please wait.
        </Typography>
      )}

      {paymentStatus === "error" && (
        <Typography color="orange" mt={2}>
          ⚠️ Error verifying payment. Contact support.
        </Typography>
      )}
    </Box>
  );
};

export default CashfreePayment;
