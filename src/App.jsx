import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import Workflow from './Workflow';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Workflow />
    </ThemeProvider>
  );
};

export default App;