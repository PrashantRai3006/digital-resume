import React, { useState } from "react";
import { Box, Typography, TextField, Button, Alert, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { auth } from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const LoginPage = ({ dynamicNavigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleAuth = async () => {
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      dynamicNavigation("/form");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      dynamicNavigation("/form");
    } catch (err) {
      setError(err.message);
    }
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
      }}
    >
      <Typography variant="h4" fontWeight="bold" mb={3}>
        {isSignup ? "Sign Up" : "Login"} to Digital Resume Builder
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Box sx={{ width: "300px" }}>
        <TextField
          placeholder="Email"
          variant="outlined"
          fullWidth
          sx={{ mb: 2, backgroundColor: "white" , borderRadius: "0px" }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          sx={{ mb: 2, backgroundColor: "white" , borderRadius: "0px!important"}}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleAuth}
          sx={{ borderRadius: "20px", padding: "10px 30px", mb: 2 }}
        >
          {isSignup ? "Sign Up" : "Login"}
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleGoogleLogin}
          sx={{ borderRadius: "20px", padding: "10px 30px", mb: 2 }}
        >
          Sign in with Google
        </Button>
        <Typography
          variant="body2"
          sx={{ mt: 2, cursor: "pointer", textDecoration: "underline" }}
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? "Already have an account? Login" : "New user? Sign up"}
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;