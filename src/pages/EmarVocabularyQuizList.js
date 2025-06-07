// src/pages/EmarVocabularyQuizList.js
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, List, ListItem, Paper, Breadcrumbs, Link } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// Initially, only lists the "Idioms" quiz. More will be added later.
const emarVocabularyTopics = [
  { id: 'emar-vocab-idioms', name: 'Idioms Vocabulary Challenge' },
  // Example for future:
  // { id: 'emar-vocab-phrasal-verbs', name: 'Phrasal Verbs Vocabulary' },
];

const EmarVocabularyQuizList = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link component={RouterLink} underline="hover" color="inherit" to="/grammar-hub">
          Grammar Hub
        </Link>
        <Link component={RouterLink} underline="hover" color="inherit" to="/emar-series-hub">
          EMAR Series Quiz
        </Link>
        <Typography color="text.primary">Vocabulary Quizzes</Typography>
      </Breadcrumbs>

      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        sx={{
          fontWeight: 'bold',
          color: 'primary.main', // Or secondary.main
          mb: 4
        }}
      >
        EMAR Series - Vocabulary Quizzes
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ mb: 5 }}>
        Test your knowledge of vocabulary from the EMAR series. Select a topic to begin.
      </Typography>
      <List>
        {emarVocabularyTopics.map((topic) => (
          <ListItem key={topic.id} disablePadding sx={{ mb: 2 }}>
            <Paper
              elevation={3}
              component={RouterLink}
              to={`/quiz/grammar/${topic.id}`} // Note: Still uses /quiz/grammar/ prefix for consistency with existing quiz page
              sx={{
                p: { xs: 2, sm: 3 },
                width: '100%',
                textDecoration: 'none',
                color: 'text.primary',
                '&:hover': { backgroundColor: 'action.hover', transform: 'scale(1.02)' },
                transition: 'transform 0.2s ease-in-out, background-color 0.2s ease-in-out',
                borderRadius: 2
              }}
            >
              <Typography variant="h5" component="h2" sx={{ fontWeight: 'medium' }}>
                {topic.name}
              </Typography>
              {/* Optional: Add description for each vocab topic later */}
            </Paper>
          </ListItem>
        ))}
        {emarVocabularyTopics.length === 0 && (
            <Typography align="center" color="text.secondary" sx={{mt: 3}}>
                More vocabulary quizzes coming soon!
            </Typography>
        )}
      </List>
    </Container>
  );
};

export default EmarVocabularyQuizList;
