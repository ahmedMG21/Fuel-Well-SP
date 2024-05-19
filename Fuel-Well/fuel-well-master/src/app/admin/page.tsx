'use client'

import { useState, ChangeEvent, useEffect } from 'react';
import { Box, Button, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setCookie, parseCookies } from "nookies";
import jwt from 'jsonwebtoken';
import { firebaseConfig } from "../../../firebase"; // Import Firebase configuration
import { initializeApp } from "firebase/app"; // Import initializeApp function
import './page.css';

// Initialize Firebase app
initializeApp(firebaseConfig);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

interface LoginFormProps { }

export default function LoginAdmin({ }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    // Check if the user is already logged in using cookies with nookies library
    const cookies = parseCookies();
    const adminToken = cookies.admin;
    if (adminToken) {
      // Redirect to admin dashboard if already logged in
      window.location.href = '/admin/dashboard';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    enqueueSnackbar('Logging in...', { variant: 'info' });
    console.log('Logging in...');
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      console.log('Successfully signed in:', userCredential.user);
      enqueueSnackbar('Logged in successfully.', { variant: 'success' });

      // Get user info or token from userCredential and set it in cookies
      const user = userCredential.user;
      if (user) {
        // Assuming you have some unique identifier for admin user
        const adminInfo = {
          userId: user.uid,
          email: user.email,
          // Add other relevant admin info
        };

        // Store admin info in cookies without using token
        setCookie(null, 'admin', JSON.stringify(adminInfo), {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        });

        // Redirect after successful login
        window.location.href = '/admin/dashboard';
      }
    } catch (error) {
      console.error("Error signing in:", error);
      // Show error message in snackbar
      enqueueSnackbar('Login failed. Please check your credentials.', { variant: 'error' });
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <SnackbarProvider maxSnack={3}>
        <main className="background">
          <Button variant="contained" color="secondary" onClick={() => window.location.href = '/'}  sx={{
            position: 'absolute',
            top: '10px',
            left: '10px',
          }}>Home</Button>
          <Box
            mt={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection={"column"}
            gap={5}
          >
            <h1 style={{
              color: 'white',
              fontSize: '2rem',
              fontWeight: 'bold',
              textAlign: 'center'
            }}>Admin Login</h1>
            <p style={{
              color: 'white',
              fontSize: '1rem',
              textAlign: 'center'
            }}>Enter your credentials to login</p>
          </Box>
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '300px' }}>
            <TextField
              fullWidth
              label="Email"
              value={username}
              onChange={handleUsernameChange}
              margin="normal"
            />
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{
                display: 'block',
                margin: 'auto',
                width: '100%',
                marginTop: '10px'
              }}
            >Login</Button>
          </Box>
        </main>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
