import React, { useState } from 'react';
import { login } from '../../services/auth'; // Assuming this path is correct
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Clear previous errors

    try {
      const result = await login(email, password);

      if (result.success) {
        // Navigation logic is handled by App.js based on user state (isAdmin, isApproved)
        // So, a simple navigate to root should suffice, App.js will redirect.
        navigate('/');
      } else {
        setError(result.error || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error("Login error:", err);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8, mb: 4 }}>
      <Paper elevation={6} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '8px' } /* Ensure theme's shape.borderRadius is applied if not default on Paper's elevation variant */}>
        <Typography component="h1" variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          Login
        </Typography>
        {error && <Typography color="error" sx={{ mb: 2, width: '100%', textAlign: 'center' }}>{error}</Typography>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
          <Typography variant="body2" align="center">
            <RouterLink to="/signup" style={{ color: '#A78BFA' /* theme.palette.secondary.main hardcoded for simplicity, or use sx with theme object */ }}>
              Don't have an account? Sign Up
            </RouterLink>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;