import React from "react";
import { Box, Typography, Grid, Paper, Slide, Button } from "@mui/material";
import { CheckCircleOutline, Security, TrendingUp, Build, Lightbulb } from "@mui/icons-material";
import { motion } from "framer-motion"; // Animation Library

export default function ChooseUs({dynamicNavigation,user}) {
  const features = [
    {
      icon: <TrendingUp fontSize="large" sx={{ color: "#FFD700" }} />, // Gold color
      title: "ATS Optimized Resumes",
      description: "Our resumes are designed to pass Applicant Tracking Systems (ATS), ensuring higher visibility to recruiters.",
    },
    {
      icon: <CheckCircleOutline fontSize="large" sx={{ color: "#00FF00" }} />, // Green color
      title: "Unlimited Downloads",
      description: "Download unlimited resumes at minimal cost without any restrictions or hidden fees.",
    },
    {
      icon: <Build fontSize="large" sx={{ color: "#00FFFF" }} />, // Cyan color
      title: "Easy & User-Friendly",
      description: "Create resumes effortlessly with our simple form-based approach—no design skills needed!",
    },
    {
      icon: <Lightbulb fontSize="large" sx={{ color: "#FFA500" }} />, // Orange color
      title: "Future-Ready: AI Integration",
      description: "AI-powered resume suggestions and multiple new templates are planned based on user feedback.",
    },
    {
      icon: <Security fontSize="large" sx={{ color: "#FF4500" }} />, // Red color
      title: "Your Privacy Matters",
      description: "We don’t store personal data in our database. Your information stays safe in your browser’s local storage.",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #000428, #004e92)",
        color: "white",
        textAlign: "center",
        px: 3,
        py: 5,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated Gradient Effect */}
      <motion.div
        animate={{ opacity: [0, 1], scale: [0.8, 1] }}
        transition={{ duration: 1 }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Why Choose <span style={{ color: "#FFD700", textShadow: "0px 0px 10px #FFD700" }}>Our Digital Resume Builder?</span>
        </Typography>
      </motion.div>

      <Typography variant="h6" sx={{ maxWidth: 800, opacity: 0.8, mb: 4 }}>
        We provide a seamless and efficient way to create professional resumes while ensuring your data remains private.
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Slide direction="up" in timeout={index * 300 + 500}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Paper
                  sx={{
                    p: 3,
                    textAlign: "center",
                    borderRadius: 3,
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 4px 20px rgba(255, 255, 255, 0.2)",
                    transition: "transform 0.3s",
                    "&:hover": { transform: "scale(1.05)", boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.4)" },
                  }}
                >
                  {feature.icon}
                  <Typography variant="h6" fontWeight="bold" mt={2}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                    {feature.description}
                  </Typography>
                </Paper>
              </motion.div>
            </Slide>
          </Grid>
        ))}
      </Grid>

      {/* Call to Action Button */}
      <motion.div
        animate={{ y: [10, 0, 10] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <Button
          variant="contained"
          color="warning"
          onClick={() => dynamicNavigation(user ? "/form" : "/login")}
          sx={{
            mt: 5,
            borderRadius: "50px",
            padding: "12px 30px",
            fontSize: "18px",
            fontWeight: "bold",
            boxShadow: "0px 4px 20px rgba(255, 215, 0, 0.5)",
            
          }}
        >
          Create Your Resume Now 🚀
        </Button>
      </motion.div>

      <Typography variant="body2" sx={{ mt: 5, opacity: 0.8, maxWidth: 600 }}>
        This is just the beginning! 🚀 More resume templates and AI-powered improvements will be added based on user feedback.
      </Typography>
    </Box>
  );
}
