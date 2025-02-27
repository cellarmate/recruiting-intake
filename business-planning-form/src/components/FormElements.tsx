import styled, { css, keyframes } from 'styled-components';

export const FormContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xxxl} ${({ theme }) => theme.spacing.xxl};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.card};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 8px;
    background: ${({ theme }) => theme.gradients.umortgageDiagonal};
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

interface FormSectionProps {
  active?: boolean;
  animate?: boolean;
}

export const FormSection = styled.section<FormSectionProps>`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  position: relative;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.card};
  padding: ${({ theme }) => theme.spacing.xl};
  
  ${({ active, animate }) => !active && css`
    display: none;
  `}
  
  ${({ animate }) => animate && css`
    animation: ${fadeIn} 0.4s ease-out;
  `}
`;

export const SectionNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

export const SectionIndicator = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const SectionTitle = styled.h2`
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

export const SectionSubtitle = styled.h3`
  color: ${({ theme }) => theme.colors.navy};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: 1.3rem;
`;

export const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

export const FormGroup = styled.div<{ width?: string }>`
  flex: ${({ width }) => width || '1'};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  min-width: ${({ width }) => (width === '1' ? '100%' : '250px')};
`;

export const Label = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  color: ${({ theme }) => theme.colors.navy};
`;

export const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.greyLight};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 1rem;
  transition: all 0.2s ease-in-out;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.teal};
    box-shadow: 0 0 0 3px rgba(78, 205, 196, 0.1);
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.greyLight};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: all 0.2s ease-in-out;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.teal};
    box-shadow: 0 0 0 3px rgba(78, 205, 196, 0.1);
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.greyLight};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: 1rem;
  background-color: ${({ theme }) => theme.colors.white};
  transition: all 0.2s ease-in-out;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.teal};
    box-shadow: 0 0 0 3px rgba(78, 205, 196, 0.1);
  }
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  
  &:checked {
    accent-color: ${({ theme }) => theme.colors.teal};
  }
`;

export const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const RadioOption = styled.div`
  display: flex;
  align-items: center;
`;

export const Radio = styled.input.attrs({ type: 'radio' })`
  margin-right: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  
  &:checked {
    accent-color: ${({ theme }) => theme.colors.teal};
  }
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'outline' }>`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: ${({ theme }) => theme.shadows.button};
  
  ${({ variant, theme }) => {
    switch (variant) {
      case 'secondary':
        return `
          background: ${theme.gradients.umortgageDiagonal};
          color: ${theme.colors.white};
          border: none;
          
          &:hover {
            opacity: 0.9;
            transform: translateY(-2px);
            box-shadow: ${theme.shadows.button}, 0 6px 20px rgba(78, 205, 196, 0.4);
          }
        `;
      case 'outline':
        return `
          background-color: ${theme.colors.purple};
          color: ${theme.colors.white};
          border: none;
          box-shadow: ${theme.shadows.button};
          font-weight: ${theme.fontWeights.extraBold};
          
          &:hover {
            background-color: ${theme.colors.purpleLight};
            transform: translateY(-1px);
            box-shadow: 0 4px 10px rgba(123, 104, 238, 0.3);
          }
        `;
      default: // primary
        return `
          background: ${theme.gradients.umortgageDiagonal};
          color: ${theme.colors.white};
          border: none;
          
          &:hover {
            opacity: 0.9;
            transform: translateY(-2px);
            box-shadow: ${theme.shadows.button}, 0 6px 20px rgba(123, 104, 238, 0.4);
          }
        `;
    }
  }}
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xxl};
  justify-content: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

export const ErrorMessage = styled.p`
  color: #d32f2f;
  font-size: 0.875rem;
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const HelperText = styled.p`
  color: ${({ theme }) => theme.colors.grey};
  font-size: 0.875rem;
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.greyLight};
  margin: ${({ theme }) => theme.spacing.lg} 0;
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.gradients.umortgageCard};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border: 1px solid rgba(123, 104, 238, 0.1);
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

export const AccentText = styled.span`
  font-family: ${({ theme }) => theme.fonts.accent}, ${({ theme }) => theme.fonts.fallback};
  color: ${({ theme }) => theme.colors.purple};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const NumberedList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const NumberedItem = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const NumberBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: ${({ theme }) => theme.gradients.umortgageDiagonal};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  flex-shrink: 0;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

export const FormHeader = styled.header`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxxl};
  position: relative;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .logo {
    max-width: 250px;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
  
  h1 {
    color: ${({ theme }) => theme.colors.navy};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    font-weight: ${({ theme }) => theme.fontWeights.extraBold};
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 4px;
      background: ${({ theme }) => theme.gradients.umortgageAccent};
      border-radius: ${({ theme }) => theme.borderRadius.small};
    }
  }
  
  p {
    color: ${({ theme }) => theme.colors.grey};
    max-width: 600px;
    margin: 0 auto;
    margin-top: ${({ theme }) => theme.spacing.md};
  }
`;

export const FormFooter = styled.footer`
  margin-top: ${({ theme }) => theme.spacing.xxxl};
  padding-top: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  color: ${({ theme }) => theme.colors.grey};
  font-size: 0.875rem;
  border-top: 1px solid ${({ theme }) => theme.colors.greyLight};
  
  img {
    max-width: 120px;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

export const GradientText = styled.span`
  background: ${({ theme }) => theme.gradients.umortgageDiagonal};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(10, 15, 54, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.large};
  max-width: 90%;
`;
