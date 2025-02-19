import React from "react";
import { Box, Typography, Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const ThankYouPage = ({ dynamicNavigation ,formData}) => {
  const handleSubmit = () => {
    
    // const element = document.createElement("a");
    // const file = new Blob([JSON.stringify(formData, null, 2)], {
    //   type: "text/plain",
    // });
    // element.href = URL.createObjectURL(file);
    // element.download = "resume.txt";
    // document.body.appendChild(element);
    // element.click();
    // document.body.removeChild(element);
    dynamicNavigation("/");
  };
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, rgba(63,81,181,1) 30%, rgba(144,202,249,1) 100%)",
        color: "white",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <CheckCircleOutlineIcon
        sx={{
          fontSize: "100px",
          color: "#4caf50",
          marginBottom: "20px",
        }}
      />
      <Typography variant="h3" fontWeight="bold" mb={3}>
        Thank You!
      </Typography>
      <Typography variant="h5" mb={4}>
        Your digital resume has been successfully created!
      </Typography>
      <Typography
        variant="body1"
        sx={{ maxWidth: "600px", marginBottom: "40px", lineHeight: "1.8" }}
      >
        We appreciate your effort in providing the details. Your resume is ready
        to make a great first impression. Best wishes for your professional
        journey ahead!
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={handleSubmit}
        sx={{
          background: "white",
          color: "#3f51b5",
          borderRadius: "20px",
          padding: "10px 30px",
          fontWeight: "bold",
          "&:hover": {
            background: "#f0f0f0",
          },
        }}
      >
        Go to Homepage
      </Button>
    </Box>
  );
};

export default ThankYouPage;
