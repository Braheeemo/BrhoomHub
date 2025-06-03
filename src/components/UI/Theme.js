import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6A509C', // Deep Lavender Purple
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#A78BFA', // Soft Periwinkle
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F5F4FF', // Light Lavender (for overall page background)
      paper: '#FFFFFF',    // White for Cards/Paper components
    },
    text: {
      primary: '#1A1A1A',   // Dark Gray
      secondary: '#4A4A4A', // Slightly lighter gray for secondary text
    },
    success: { // Accent color for success messages
      main: '#4ECDC4', // Teal Green
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#D32F2F', // Material UI default red, or a custom one
    },
  },
  typography: {
    fontFamily: '"Lato", "Roboto", "Helvetica", "Arial", sans-serif', // Default body font
    h1: { fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif', fontWeight: 700 },
    h2: { fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif', fontWeight: 700 },
    h3: { fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif', fontWeight: 700 },
    h4: { fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif', fontWeight: 700 },
    h5: { fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif', fontWeight: 600 }, // Slightly less bold for h5
    h6: { fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif', fontWeight: 600 }, // Slightly less bold for h6
    // Lato will be the default due to fontFamily at the root of typography object.
  },
  shape: {
    borderRadius: 8, // Default border radius for components like Card, Paper, Button
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Ensure buttons also use the 8px radius
          textTransform: 'none', // More modern look than ALL CAPS
        },
        containedPrimary: {
          color: '#FFFFFF', // Ensure contrast if not automatically handled by main.contrastText
          '&:hover': {
            backgroundColor: '#523D7A', // Darker shade of primary for hover
          }
        },
        outlinedSecondary: { // For secondary actions
          borderColor: '#A78BFA',
          color: '#A78BFA',
          '&:hover': {
            backgroundColor: 'rgba(167, 139, 250, 0.08)', // Light Periwinkle background on hover
            borderColor: '#8A6FDA', // Slightly darker Periwinkle border on hover
          }
        },
      },
      defaultProps: {
        disableElevation: false, // Keep elevation for contained buttons
      }
    },
    MuiPaper: { // Default styles for Paper component (includes Card as Card uses Paper)
      styleOverrides: {
        root: {
          // backgroundColor: '#FFFFFF', // Already set by palette.background.paper
          // borderRadius: '8px', // Already set by shape.borderRadius
        },
      },
      defaultProps: {
        elevation: 2, // A subtle default elevation for Paper/Cards (can be overridden)
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          // Specific Card styling if different from Paper
          // For now, inherit from Paper and shape.borderRadius
          boxShadow: '0 2px 8px rgba(106, 80, 156, 0.1)', // Apply the user requested shadow
        }
      }
    },
    // Optional: Define global styles for MuiCssBaseline if not handled in index.js
    // MuiCssBaseline: {
    //   styleOverrides: `
    //     body {
    //       background-color: #F5F4FF;
    //     }
    //   `,
    // },
  },
});

export default theme;