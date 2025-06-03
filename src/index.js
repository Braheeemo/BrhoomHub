import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; // Import CssBaseline
import theme from './components/UI/Theme';
import './styles.css'; // Corrected import to point to existing styles.css

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Ensures baseline styles and applies background from theme */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);