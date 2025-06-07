// src/pages/EmarSeriesHub.js
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Grid, Paper, Button } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School'; // For Grammar
import ExtensionIcon from '@mui/icons-material/Extension'; // For Vocabulary (placeholder icon)

const EmarSeriesHub = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        align="center"
        sx={{
          fontWeight: 'bold',
          color: 'primary.main',
          mb: 4
        }}
      >
        EMAR Tailored Learning (EMAR Series Quiz)
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ mb: 5 }}>
        This is a quiz that tests your knowledge in the Emar English Book. Choose a category below to start.
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {/* Grammar Section Card */}
        <Grid item xs={12} sm={6} md={5}>
          <Paper
            elevation={4}
            sx={{
              p: 3,
              textAlign: 'center',
              '&:hover': { transform: 'scale(1.03)', boxShadow: 6 },
              transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              borderRadius: 2 // theme.shape.borderRadius is 8px
            }}
          >
            <SchoolIcon sx={{ fontSize: 60, color: 'primary.dark', mb: 2 }} />
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'medium' }}>
              Grammar
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              Test your understanding of English grammar rules covered in the EMAR series.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={RouterLink}
              to="/emar-grammar-quiz-list"
              fullWidth
            >
              Go to Grammar Quizzes
            </Button>
          </Paper>
        </Grid>

        {/* Vocabulary Section Card (Active) */}
        <Grid item xs={12} sm={6} md={5}>
          <Paper
            elevation={4}
            component={RouterLink}
            to="/emar-vocabulary-quiz-list"
            sx={{
              p: 3,
              textAlign: 'center',
              '&:hover': { transform: 'scale(1.03)', boxShadow: 6 },
              transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              borderRadius: 2,
              textDecoration: 'none', // for RouterLink on Paper
              color: 'inherit' // for RouterLink on Paper
            }}
          >
            <ExtensionIcon sx={{ fontSize: 60, color: 'primary.dark', mb: 2 }} /> {/* Updated icon color */}
            <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'medium' }}>
              Vocabulary
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              Explore vocabulary topics from the EMAR series.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component={RouterLink} // Added to make button also a link, consistent with Grammar card
              to="/emar-vocabulary-quiz-list"
              fullWidth
            >
              Go to Vocabulary Quizzes
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EmarSeriesHub;
