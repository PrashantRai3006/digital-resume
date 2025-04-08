import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography, Button } from "@mui/material";

const PAYMENT_URL = process.env.REACT_APP_PAYMENT_URL;

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const orderId = searchParams.get("order_id");
  const [status, setStatus] = useState("loading"); // "loading", "success", "failed", "error"

  useEffect(() => {
    const verifyPayment = async () => {
      if (!orderId) {
        setStatus("error");
        return;
      }

      try {
        const response = await fetch(`${PAYMENT_URL}/verify-payment/${orderId}`);
        if (!response.ok) throw new Error("Failed to verify payment");

        const data = await response.json();
        console.log("✅ Verification response:", data);

        if (data.status === "success") {
          setStatus("success");
        } else {
          setStatus("failed");
        }
      } catch (error) {
        console.error("❌ Verification error:", error);
        setStatus("error");
      }
    };

    verifyPayment();
  }, [orderId]);

  const handleGoToResume = () => {
    navigate("/digital-resume/1");
  };

  return (
    <Box
      textAlign="center"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      px={2}
      sx={{
        backgroundColor: "#001f3f", // dark blue background
        color: "#ffffff",           // white text
      }}
    >
      {status === "loading" && (
        <>
          <CircularProgress sx={{ color: "white" }} />
          <Typography mt={2}>Verifying your payment...</Typography>
        </>
      )}

      {status === "success" && (
        <>
          <Typography variant="h5" fontWeight="bold" color="success.main">
            ✅ Payment Successful!
          </Typography>
          <Typography mt={1}>Thank you for your payment.</Typography>
          <Button
            variant="contained"
            color="success"
            onClick={handleGoToResume}
            sx={{ mt: 3 }}
          >
            View Your Resume
          </Button>
        </>
      )}

      {status === "failed" && (
        <>
          <Typography variant="h5" fontWeight="bold" color="error.main">
            ❌ Payment Failed
          </Typography>
          <Typography mt={1}>Please try again or contact support.</Typography>
        </>
      )}

      {status === "error" && (
        <>
          <Typography variant="h5" fontWeight="bold" color="warning.main">
            ⚠️ Something went wrong
          </Typography>
          <Typography mt={1}>Unable to verify your payment. Contact support.</Typography>
        </>
      )}
    </Box>
  );
};

export default PaymentSuccess;
