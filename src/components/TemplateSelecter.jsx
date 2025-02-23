import { useNavigate } from "react-router-dom";
import templates from "../data/templates";
import { Button, Box, Typography } from "@mui/material";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import LogoutIcon from "@mui/icons-material/Logout";

const TemplateSelector = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState([true, ...Array(templates.length - 1).fill(false)]);

  const handleTemplateSelection = (id, index) => {
    const newSelectedTemplate = Array(templates.length).fill(false);
    newSelectedTemplate[index] = true;
    setSelectedTemplate(newSelectedTemplate);
    navigate(`/digital-resume/${id}`);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully!");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
        textAlign: "center",
        width: "100%",
        padding: "20px",
        borderBottom: "2px solid #ddd",
        position:'relative'
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "#3f51b5",
          fontWeight: "bold",
          position: "absolute",
        }}
      >
        Select Your Resume Template
      </Typography>
      <Button
        variant="contained"
        color="error"
        onClick={handleLogout}
        startIcon={<LogoutIcon />}
        sx={{
          borderRadius: "8px",
          padding: "8px 20px",
          fontWeight: "bold",
          backgroundColor: "#d32f2f",
          '&:hover': { backgroundColor: "#b71c1c" },
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          marginLeft: "auto",
          marginRight: "20px",
        }}
      >
        Log Out
      </Button>
    </Box>
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 2,
        margin: "20px 0",
        width: "100%",
      }}
    >
      {templates.map((template, index) => (
        <Button key={template.id} sx={selectedTemplate[index] ? { border: '2px solid blue' } : {}}>
          <img
            height={70}
            width={70}
            src={template.thumbnail}
            alt={template.name}
            className="template-thumbnail"
            onClick={() => handleTemplateSelection(template.id, index)}
            style={{ cursor: "pointer", borderRadius: "8px", transition: "0.3s", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)" }}
          />
        </Button>
      ))}
    </Box>
    </>
  );
};

export default TemplateSelector;