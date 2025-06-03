import React from 'react';
import { Container, Typography, Paper, Grid, Box } from '@mui/material';

const ProgressTracking = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'primary.main', textAlign: 'center', fontWeight: 'bold' }}>
        Your Progress
      </Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', height: 240, justifyContent: 'center' }}>
            <Typography variant="h6" color="secondary.main" gutterBottom>Overall Completion</Typography>
            {/* Placeholder for circular progress */}
            <Box sx={{ my: 'auto', color: 'success.main', fontSize: '1.5rem', fontWeight:'bold', textAlign: 'center' }}>
              [Circular Progress/Summary Placeholder]
              <Typography variant="body2" color="text.secondary" sx={{mt:1}}>Detailed stats coming soon!</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', height: 240, justifyContent: 'center' }}>
            <Typography variant="h6" color="secondary.main" gutterBottom>Scores per Section</Typography>
            {/* Placeholder for bar chart */}
            <Box sx={{ my: 'auto', color: 'success.main', fontSize: '1.5rem', fontWeight:'bold', textAlign: 'center' }}>
              [Bar Chart/List Placeholder]
              <Typography variant="body2" color="text.secondary" sx={{mt:1}}>Breakdown of scores will appear here.</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mt: 2}}>
            <Typography variant="h6" color="secondary.main" gutterBottom>Activity Log</Typography>
            <Typography variant="body1" color="text.secondary">
              Recent quizzes and activities will be listed here...
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProgressTracking;
