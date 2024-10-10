
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; 
import Workflow from './Workflow';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Workflow />
    </ThemeProvider>
  );
};

export default App;
