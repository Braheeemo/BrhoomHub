import React from 'react';
import { Container, Paper, Typography, CircularProgress, Button } from '@mui/material'; // Removed Box
// import { Link as RouterLink } from 'react-router-dom'; // REMOVED: Unused import
import { auth } from '../../services/firebase'; // To potentially offer a logout option
import LogoutIcon from '@mui/icons-material/Logout'; // Import LogoutIcon

const WaitingApproval = () => {
  const handleLogout = () => {
    auth.signOut();
    // Navigate to login, which App.js should handle automatically on auth state change
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
      <Paper elevation={6} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', borderRadius: '8px' } /* Ensure theme's shape.borderRadius is applied */}>
        <CircularProgress sx={{ mb: 3, color: 'secondary.main' }} />
        <Typography component="h1" variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          Awaiting Admin Approval
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
          Thank you for signing up! Your account is currently pending approval from an administrator.
          Please check back later. You will be automatically redirected once your account is approved.
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
          If you have any questions, please contact support.
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleLogout}
          sx={{mt: 2}}
          startIcon={<LogoutIcon />}
        >
          Logout
        </Button>
      </Paper>
    </Container>
  );
};

export default WaitingApproval;