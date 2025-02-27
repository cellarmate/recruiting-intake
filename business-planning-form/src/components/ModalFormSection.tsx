import React from 'react';
import styled from 'styled-components';
import { Button } from './FormElements';

interface ModalFormSectionProps {
  title: string;
  isActive: boolean;
  onNext: () => void;
  onPrevious: () => void;
  isFirstSection?: boolean;
  isLastSection?: boolean;
  children: React.ReactNode;
}

const ModalContainer = styled.div<{ isActive: boolean }>`
  display: ${({ isActive }) => (isActive ? 'block' : 'none')};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.card};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  animation: fadeIn 0.3s ease-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.navy};
  border-bottom: none;
  padding-bottom: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  font-weight: ${({ theme }) => theme.fontWeights.extraBold};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100px;
    height: 4px;
    background: ${({ theme }) => theme.gradients.umortgageAccent};
    border-radius: ${({ theme }) => theme.borderRadius.small};
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const ModalFormSection: React.FC<ModalFormSectionProps> = ({
  title,
  isActive,
  onNext,
  onPrevious,
  isFirstSection = false,
  isLastSection = false,
  children
}) => {
  return (
    <ModalContainer isActive={isActive}>
      <SectionTitle>{title}</SectionTitle>
      {children}
      <NavigationButtons>
        <Button 
          type="button" 
          variant="outline" 
          onClick={onPrevious} 
          disabled={isFirstSection}
        >
          Previous
        </Button>
        {isLastSection ? (
          <Button type="submit">Submit Form</Button>
        ) : (
          <Button type="button" onClick={onNext}>
            Next
          </Button>
        )}
      </NavigationButtons>
    </ModalContainer>
  );
};

export default ModalFormSection;