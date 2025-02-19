import React from "react";
import { Box, Typography, Button } from "@mui/material";

const HomePage = ({ dynamicNavigation }) => {
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
      }}
    >
      <Typography variant="h2" fontWeight="bold" mb={3}>
        Welcome to Digital Resume Builder
      </Typography>
      <Typography variant="h6" mb={4}>
        Create stunning resumes with ease and sophistication.
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        onClick={()=>dynamicNavigation("/form")}
        sx={{ borderRadius: "20px", padding: "10px 30px" }}
      >
        Get Started
      </Button>
    </Box>
  );
};

export default HomePage;
