import React, { useEffect, useState, useRef } from "react";
import { Grid, CircularProgress, Box, Typography } from "@mui/material";
import templates from "../data/templates";
import Lottie from "lottie-react";
import { ReactTyped } from "react-typed";
import typingAnimation from "../data/typingAnimation.json"; // Replace with your Lottie JSON file

export default function KnowMore() {
  const [loading, setLoading] = useState(false);
  const imageContainerRef = useRef(null);

  // Auto-scroll effect
  useEffect(() => {
    const scrollContainer = imageContainerRef.current;
    if (!scrollContainer) return;

    const scrollInterval = setInterval(() => {
      // If reached the bottom, reset to top
      if (
        scrollContainer.scrollTop + scrollContainer.clientHeight >=
        scrollContainer.scrollHeight
      ) {
        scrollContainer.scrollTop = 0; // Reset scroll position
      } else {
        scrollContainer.scrollBy({ top: 1, behavior: "smooth" });
      }
    }, 50); // Adjust speed by changing interval

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          padding: "40px",
          background: "linear-gradient(135deg, #000428, #004e92)",
        }}
      >
        <Grid item xs={8}>
          <Grid
            container
            spacing={2}
            sx={{ p: 2, height: "100%", width: "100%" }}
          >
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: "60%",
                  height: "60%",
                  marginTop: "-200px",
                  borderRadius: 2,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Lottie
                  animationData={typingAnimation}
                  style={{ width: "100%", height: "100%" }}
                />

                {/* Hover Effect: Expands Height Dynamically */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    height: "15%", // Initial height
                    background: "rgba(255, 255, 255, 0.9)", // Light background for contrast
                    color: "black",
                    transition: "height 0.3s ease-in-out",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "10px",
                    cursor: "pointer",
                    "&:hover": {
                      height: "max(30%, 40%)", // Expands based on content height
                    },
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    #
                    <ReactTyped
                      strings={[
                        "Enclose text within # to emphasize it in bold.",
                      ]}
                      typeSpeed={100}
                      backSpeed={50}
                      loop
                    />
                    #
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: "bold",marginBottom:"16px" }}
                  >
                    ↓
                  </Typography>
                  <Box px={6}>
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Enclose words or sentences within #...# in Profile Summary, Responsibilities, Skills, Personal Details, and Certificates to highlight them in bold.
                  </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          {/* Scrollable Container */}
          <div
            ref={imageContainerRef}
            style={{
              height: "100vh", // Adjust height as needed
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {templates.map((src, index) => (
              <div key={index} style={{ margin: "30px" }}>
                <img
                  src={src.thumbnail}
                  alt={`Template ${index}`}
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              </div>
            ))}
            {loading && <CircularProgress />}
          </div>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </>
  );
}
