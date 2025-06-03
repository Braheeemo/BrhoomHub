import React, { useState } from 'react';
import { signup } from '../../services/auth'; // Assuming this path is correct
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material';
// import { useTheme } from '@mui/material/styles';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  // const theme = useTheme();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Clear previous errors

    try {
      const result = await signup(email, password);

      if (result.success) {
        // After successful signup, user data is created in Firestore by `signup` service
        // with isApproved: false. App.js will route to /waiting-approval.
        navigate('/waiting-approval');
      } else {
        setError(result.error || 'Signup failed. Please try again.');
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8, mb: 4 }}>
      <Paper elevation={6} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '8px' } /* Ensure theme's shape.borderRadius is applied */}>
        <Typography component="h1" variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          Sign Up
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
            autoComplete="new-password"
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
            Sign Up
          </Button>
          <Typography variant="body2" align="center">
            <RouterLink to="/login" style={{ color: '#A78BFA' /* theme.palette.secondary.main hardcoded for simplicity */ }}>
              Already have an account? Log In
            </RouterLink>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Signup;