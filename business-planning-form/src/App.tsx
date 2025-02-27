import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/globalStyles';
import ModularBusinessPlanningForm from './components/ModularBusinessPlanningForm';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ModularBusinessPlanningForm />
    </ThemeProvider>
  );
};

export default App;