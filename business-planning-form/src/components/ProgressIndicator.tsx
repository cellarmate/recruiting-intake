import React from 'react';
import styled from 'styled-components';

interface ProgressIndicatorProps {
  currentSection: number;
  totalSections: number;
  onSectionClick?: (section: number) => void;
}

const ProgressContainer = styled.div`
  margin: 40px 0;
  padding: 0 20px;
  position: relative;
`;

const ProgressBar = styled.div`
  height: 10px;
  background: linear-gradient(90deg, rgba(123, 104, 238, 0.1) 0%, rgba(78, 205, 196, 0.1) 100%);
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const Progress = styled.div<{ progress: number }>`
  height: 100%;
  width: ${({ progress }) => `${progress}%`};
  background: ${({ theme }) => theme.gradients.umortgageDiagonal};
  border-radius: 5px;
  transition: width 0.5s ease-out;
  box-shadow: 0 1px 3px rgba(123, 104, 238, 0.3);
`;

const SectionInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.navy};
  font-size: 0.85rem;
  font-weight: 500;
  
  span:first-child {
    position: relative;
    padding-left: 20px;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 12px;
      height: 12px;
      background: ${({ theme }) => theme.gradients.umortgageDiagonal};
      border-radius: 50%;
    }
  }
  
  span:last-child {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.purple};
  }
`;

const SectionDots = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding: 0 10px;
`;

const SectionDot = styled.div<{ active: boolean; completed: boolean; clickable: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${({ active, completed, theme }) => 
    active 
      ? theme.colors.purple 
      : completed 
        ? theme.colors.teal 
        : theme.colors.greyLight};
  transition: all 0.3s ease;
  position: relative;
  cursor: ${({ clickable }) => clickable ? 'pointer' : 'default'};
  
  &:hover {
    transform: ${({ clickable }) => clickable ? 'scale(1.2)' : 'none'};
  }
  
  &::after {
    content: attr(data-section);
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.7rem;
    color: ${({ active, theme }) => active ? theme.colors.purple : theme.colors.grey};
    font-weight: ${({ active }) => active ? '600' : '400'};
    white-space: nowrap;
  }
`;

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  currentSection, 
  totalSections,
  onSectionClick 
}) => {
  const progress = (currentSection / totalSections) * 100;
  
  return (
    <ProgressContainer>
      <ProgressBar>
        <Progress progress={progress} />
      </ProgressBar>
      <SectionInfo>
        <span>Section {currentSection} of {totalSections}</span>
        <span>{Math.round(progress)}% Complete</span>
      </SectionInfo>
      
      <SectionDots>
        {Array.from({ length: totalSections }).map((_, index) => (
          <SectionDot 
            key={index}
            active={currentSection === index + 1}
            completed={currentSection > index + 1}
            clickable={!!onSectionClick}
            data-section={index + 1}
            onClick={() => onSectionClick && onSectionClick(index + 1)}
          />
        ))}
      </SectionDots>
    </ProgressContainer>
  );
};

export default ProgressIndicator;