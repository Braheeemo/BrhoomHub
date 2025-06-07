import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase'; // Assuming path is correct
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  CircularProgress,
  Box,
  Alert
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // Import icon

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError('');
      try {
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
      } catch (err) {
        console.error("Error fetching users:", err);
        let displayError = "Failed to fetch users. Please try again.";
        if (err.message) {
          displayError += ` Message: ${err.message}`;
        }
        if (err.code) {
          displayError += ` (Code: ${err.code})`;
        }
        setError(displayError);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const handleApprove = async (userId) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, {
        isApproved: true,
      });

      setUsers(users.map(user =>
        user.id === userId ? { ...user, isApproved: true } : user
      ));
    } catch (err) {
      console.error("Error approving user:", err);
      // Potentially set an error message for this specific action
      alert("Failed to approve user."); // Simple alert for now
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
        Admin Dashboard
      </Typography>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
          <CircularProgress />
        </Box>
      )}
      {error && <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>}

      {!loading && !error && (
        <Paper elevation={3} sx={{ mt: 2, p: 2 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'secondary.main', ml: 2 }}>
            User Management
          </Typography>
          <List>
            {users.map(user => (
              <ListItem key={user.id} divider>
                <ListItemText
                  primary={user.email}
                  secondary={`Approved: ${user.isApproved ? 'Yes' : 'No'} | Admin: ${user.isAdmin ? 'Yes' : 'No'}`}
                />
                <ListItemSecondaryAction>
                  {!user.isApproved && (
                    <Button
                      variant="contained"
                      color="success" // Use success color from theme
                      size="small"
                      onClick={() => handleApprove(user.id)}
                      startIcon={<CheckCircleOutlineIcon />}
                    >
                      Approve
                    </Button>
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          {users.length === 0 && <Typography sx={{textAlign: 'center', p:2}}>No users found.</Typography>}
        </Paper>
      )}
    </Container>
  );
};

export default AdminDashboard;