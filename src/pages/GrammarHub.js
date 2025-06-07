// src/pages/GrammarHub.js
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, List, ListItem, Paper } from '@mui/material'; // Removed Box

const grammarSections = [
  { id: 'present-simple', name: 'Present Simple' },
  { id: 'past-simple', name: 'Past Simple' },
  { id: 'present-progressive', name: 'Present Progressive' },
  { id: 'present-perfect', name: 'Present Perfect' },
  { id: 'past-perfect', name: 'Past Perfect' },
  { id: 'present-perfect-progressive', name: 'Present Perfect Progressive' },
  { id: 'clauses', name: 'Clauses' },
  { id: 'if-conditionals', name: 'If Conditionals' },
  { id: 'passive-voice', name: 'Passive Voice' },
  { id: 'reported-speech', name: 'Reported Speech' },
  { id: 'prepositions', name: 'Prepositions' },
  { id: 'phrasal-verbs', name: 'Phrasal Verbs' },
  {
    id: 'emar-series',
    name: 'EMAR Tailored Learning (EMAR Series Quiz)',
    description: 'This is a quiz that tests your knowledge in the Emar English Book',
    customPath: '/emar-series-hub'
  }
];

const GrammarHub = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom
        sx={{
          mb: 4,
          fontWeight: 'bold',
          color: 'primary.main',
          background: 'linear-gradient(45deg, #6A509C 30%, #4ECDC4 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center'
        }}
      >
        Grammar Hub
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom sx={{ mb: 4 }}>
        Select a grammar topic below to start a quiz and practice your skills.
      </Typography>
      <List>
        {grammarSections.map((section) => (
          <ListItem key={section.id} disablePadding sx={{ mb: 2 }}>
            <Paper
              elevation={3}
              component={RouterLink}
              to={section.customPath || `/quiz/grammar/${section.id}`} // MODIFIED LINE
              sx={{
                p: 3,
                width: '100%',
                textDecoration: 'none',
                color: 'text.primary',
                '&:hover': { backgroundColor: 'action.hover', transform: 'scale(1.02)' },
                transition: 'transform 0.2s ease-in-out, background-color 0.2s ease-in-out',
                borderRadius: '8px'
              }}
            >
              <Typography variant="h5" component="h2" sx={{ fontWeight: 'medium' }}>
                {section.name}
              </Typography>
              {section.description && ( // ADDED BLOCK for description
                <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                  {section.description}
                </Typography>
              )}
            </Paper>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default GrammarHub;
