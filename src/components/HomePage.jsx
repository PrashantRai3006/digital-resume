import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import KnowMore from "./KnowMore";
import { motion } from "framer-motion"; // Animation Library
const HomePage = ({ dynamicNavigation }) => {
  const [user, setUser] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Circular Parallax Effect
  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 10;
      const y = (event.clientY / window.innerHeight - 0.5) * 10;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  const scrollToNextSection = () => {
    document
      .getElementById("resume-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          color: "white",
          textAlign: "center",
        }}
      >
        {/* Background Animation */}
        <style>
          {`
          @keyframes twinkle {
            0% { opacity: 0.4; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.5); }
            100% { opacity: 0.4; transform: scale(1); }
          }

          @keyframes circularMotion {
            0% { transform: translate(0px, 0px) rotate(0deg); }
            50% { transform: translate(5px, 5px) rotate(180deg); }
            100% { transform: translate(0px, 0px) rotate(360deg); }
          }

          @keyframes curvedShootingStar {
            0% { transform: translate(0, 0) rotate(30deg); opacity: 1; }
            100% { transform: translate(-800px, 800px) rotate(45deg); opacity: 0; }
          }
 @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(10px); }
          }

          @keyframes fadeInOut {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 1; }
          }
          .stars {
            position: absolute;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at center,  #000428 0%, #004e92 100%);
            z-index: -1;
            transform: translate(${mousePos.x}px, ${mousePos.y}px);
          }

          .star {
            position: absolute;
            width: 3px;
            height: 3px;
            background: white;
            border-radius: 50%;
            animation: twinkle 10s infinite alternate, circularMotion 12s infinite linear;
          }

          .shooting-star {
            position: absolute;
            top: 0;
            width: 4px;
            height: 4px;
            background: white;
            border-radius: 50%;
            box-shadow: 0 0 10px white;
            animation: curvedShootingStar 5s linear infinite;
          }

          .glow-text:hover {
            text-shadow: 0px 0px 10px #fff, 0px 0px 20px #f39c12;
          }

          .cta-button {
            transition: transform 0.3s ease-out;
          }

          .cta-button:hover {
            transform: scale(1.1);
          }
            .scroll-hint {
            
            font-size: 1.2rem;
            cursor: pointer;
            opacity: 0.8;
            animation: fadeInOut 2s infinite;
          }

          .scroll-arrow {
            
            font-size: 2rem;
            cursor: pointer;
            animation: bounce 1.5s infinite;
          }
        `}
        </style>

        {/* Slow Moving Circular Stars */}
        <div className="stars">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                top: `${Math.random() * 100}vh`,
                left: `${Math.random() * 100}vw`,
                animationDuration: `${Math.random() * 10 + 8}s`,
              }}
            />
          ))}
        </div>

        {/* Text & CTA */}
        <Typography variant="h2" fontWeight="bold" mb={3} className="glow-text">
          Welcome to Digital Resume Builder
        </Typography>
        <Typography variant="h6" mb={2} className="glow-text">
          Create stunning resumes with ease and sophistication.
        </Typography>

        {/* Inspirational Quote */}
        <Typography
          variant="h5"
          fontStyle="italic"
          fontWeight="light"
          sx={{
            opacity: 0.8,
            mt: 2,
            animation: "twinkle 10s infinite alternate",
          }}
        >
          Shine like the stars, build your future with us.
        </Typography>
        <motion.div
        animate={{ y: [10, 0, 10] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <Button
  variant="contained"
  onClick={() => dynamicNavigation(user ? "/form" : "/login")}
  sx={{
    mt: 5,
    borderRadius: "50px",
    padding: "12px 30px",
    fontSize: "18px",
    fontWeight: "bold",
    background: "linear-gradient(135deg, #00bcd4, #0077b6)", // Teal to Blue Gradient
    color: "white",
    boxShadow: "0px 4px 20px rgba(0, 188, 212, 0.5)", // Cyan Glow
    "&:hover": {
      background: "linear-gradient(135deg, #0077b6, #00bcd4)", // Reverse Gradient on Hover
      boxShadow: "0px 6px 25px rgba(0, 188, 212, 0.7)",
    },
  }}
>
  Create Your Resume Now 🚀
</Button>

                </motion.div>
        <Box sx={{ position: "absolute", bottom: "20px" }}>
          <Typography className="scroll-hint">
            Scroll down to learn more
          </Typography>
          <Typography className="scroll-arrow" onClick={scrollToNextSection}>
            ↓
          </Typography>
        </Box>
      </Box>
      <Box id="resume-section">
        <KnowMore dynamicNavigation={dynamicNavigation} user={user}/>
      </Box>
    </>
  );
};

export default HomePage;
