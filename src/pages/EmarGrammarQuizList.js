// src/pages/EmarGrammarQuizList.js
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, List, ListItem, Paper, Breadcrumbs, Link, Box } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const emarGrammarTopics = [
  { id: 'emar-tenses', name: 'Tenses Review' },
  { id: 'emar-passive-voice', name: 'Passive Voice Review' },
  { id: 'emar-conditionals', name: 'Conditionals Review' },
  { id: 'emar-reported-speech', name: 'Reported Speech Review' },
  { id: 'emar-modals', name: 'Modals Review' },
  { id: 'emar-relative-clauses', name: 'Relative Clauses Review' },
  { id: 'emar-causative-verbs', name: 'Causative Verbs Review' },
  { id: 'emar-inversion', name: 'Inversion Review' },
  { id: 'emar-prepositions', name: 'Prepositions Review' },
  // Add more EMAR grammar topics here as they are created
  // For example, the "Unit 1-12" short reviews could be added later
];

const EmarGrammarQuizList = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link component={RouterLink} underline="hover" color="inherit" to="/grammar-hub">
          Grammar Hub
        </Link>
        <Link component={RouterLink} underline="hover" color="inherit" to="/emar-series-hub">
          EMAR Series Quiz
        </Link>
        <Typography color="text.primary">Grammar Quizzes</Typography>
      </Breadcrumbs>

      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        sx={{
          fontWeight: 'bold',
          color: 'primary.main', // Or secondary.main for variety
          mb: 4
        }}
      >
        EMAR Series - Grammar Quizzes
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ mb: 5 }}>
        Select a specific grammar topic from the EMAR series to test your knowledge.
      </Typography>
      <List>
        {emarGrammarTopics.map((topic) => (
          <ListItem key={topic.id} disablePadding sx={{ mb: 2 }}>
            <Paper
              elevation={3}
              component={RouterLink}
              to={`/quiz/grammar/${topic.id}`}
              sx={{
                p: { xs: 2, sm: 3 }, // Responsive padding
                width: '100%',
                textDecoration: 'none',
                color: 'text.primary',
                '&:hover': { backgroundColor: 'action.hover', transform: 'scale(1.02)' },
                transition: 'transform 0.2s ease-in-out, background-color 0.2s ease-in-out',
                borderRadius: 2 // theme.shape.borderRadius
              }}
            >
              <Typography variant="h5" component="h2" sx={{ fontWeight: 'medium' }}>
                {topic.name}
              </Typography>
              {/* Optional: Add a brief description for each topic if available */}
              {/* {topic.description && (
                <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                  {topic.description}
                </Typography>
              )} */}
            </Paper>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default EmarGrammarQuizList;
