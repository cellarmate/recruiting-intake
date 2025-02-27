import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/globalStyles';
import ModularBusinessPlanningForm from './components/ModularBusinessPlanningForm';
import TranscriptProcessor from './components/TranscriptProcessor';

// Styled components for the tabs
const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  margin: 0 ${({ theme }) => theme.spacing.sm};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background: ${({ active, theme }) => 
    active ? theme.gradients.umortgageDiagonal : theme.colors.white};
  color: ${({ active, theme }) => 
    active ? theme.colors.white : theme.colors.navy};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${({ theme }) => theme.shadows.small};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'planning' | 'transcript'>('planning');

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Container>
        <TabContainer>
          <Tab 
            active={activeTab === 'planning'} 
            onClick={() => setActiveTab('planning')}
          >
            Business Planning
          </Tab>
          <Tab 
            active={activeTab === 'transcript'} 
            onClick={() => setActiveTab('transcript')}
          >
            Transcript Processor
          </Tab>
        </TabContainer>
        
        {activeTab === 'planning' && <ModularBusinessPlanningForm />}
        {activeTab === 'transcript' && <TranscriptProcessor />}
      </Container>
    </ThemeProvider>
  );
};

export default App;