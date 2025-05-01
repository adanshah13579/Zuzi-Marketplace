// src/App.jsx
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppRoutes from './routes/AppRoutes';
import colors from './Style/colors';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary || '#f4c724',
      dark: colors.primaryDark || '#deb01f',
    },
    secondary: {
      main: colors.secondary || '#0f1620',
    },
    background: {
      default: colors.background || '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;