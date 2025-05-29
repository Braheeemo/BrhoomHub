// src/components/UI/Theme.js

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#A3B18A', // Muted Green
      light: '#C8D6AF',
      dark: '#74815D',
      contrastText: '#fff',
    },
    secondary: {
      main: '#D3AC2B', // Gold
      light: '#E8C770',
      dark: '#A27D00',
      contrastText: '#000',
    },
    background: {
      default: '#F5F5DC', // Cream
      paper: '#F8F8FF',
    },
    text: {
      primary: '#333333',
      secondary: '#555555',
    },
  },
  typography: {
    fontFamily: ''Roboto', sans-serif',
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
  },
});

export default theme;