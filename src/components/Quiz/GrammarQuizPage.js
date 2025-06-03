// src/components/Quiz/GrammarQuizPage.js
import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Paper, Button, Box } from '@mui/material';

// Helper function to format the section ID into a displayable name
const formatSectionName = (id) => {
  if (!id) return 'Unknown Section';
  return id
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const GrammarQuizPage = () => {
  const { sectionId } = useParams();
  const sectionName = formatSectionName(sectionId);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ color: 'secondary.main', fontWeight: 'bold' }}>
        {`Quiz for ${sectionName}`}
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mt: 3, mb: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Quiz Area
        </Typography>
        <Typography variant="body1" sx={{ minHeight: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed grey', borderRadius: '4px' }}>
          Quiz questions and interactive elements will appear here soon.
        </Typography>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mt: 3, mb: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Answer Log (This Quiz)
        </Typography>
        <Typography variant="body1" sx={{ minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed grey', borderRadius: '4px' }}>
          Your answers and results for this specific quiz will be logged here.
        </Typography>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/progress"
          size="large"
        >
          View Overall Progress
        </Button>
      </Box>
    </Container>
  );
};

export default GrammarQuizPage;
