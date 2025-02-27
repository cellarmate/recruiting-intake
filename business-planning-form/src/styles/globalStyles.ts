import { createGlobalStyle } from 'styled-components';
import { Theme } from './theme';

export const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  /* Import fonts - in a real project, you would need to host these fonts or use a service like Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Hepta+Slab:wght@300;500;700;800&display=swap');
  
  /* For HK Nova, you would need to purchase and host this font. Using a fallback for this example */
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html, body {
    height: 100%;
    width: 100%;
  }
  
  body {
    font-family: ${({ theme }) => theme.fonts.primary}, ${({ theme }) => theme.fonts.fallback};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    color: ${({ theme }) => theme.colors.navy};
 
    background: linear-gradient(135deg, #f5f5f7 0%, #eef1ff 100%);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: relative;
    
    &::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: 
        radial-gradient(circle at 10% 10%, rgba(123, 104, 238, 0.03) 0%, transparent 70%),
        radial-gradient(circle at 90% 90%, rgba(78, 205, 196, 0.03) 0%, transparent 70%);
      z-index: -1;
    }
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.primary}, ${({ theme }) => theme.fonts.fallback};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  h1 {
    font-size: 2.5rem;
    font-weight: ${({ theme }) => theme.fontWeights.extraBold};
    color: ${({ theme }) => theme.colors.navy};
  }
  
  h2 {
    font-size: 2rem;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.navy};
  }
  
  h3 {
    font-size: 1.75rem;
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
    color: ${({ theme }) => theme.colors.navy};
  }
  
  h4 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.navy};
  }
  
  h5 {
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.navy};
  }
  
  h6 {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.navy};
  }
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.grey};
  }
  
  a {
    color: ${({ theme }) => theme.colors.teal};
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    position: relative;
    
    &:hover {
      color: ${({ theme }) => theme.colors.purple};
      
      &::after {
        width: 100%;
      }
    }
    
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 2px;
      background: ${({ theme }) => theme.gradients.umortgageDiagonal};
      transition: width 0.3s ease;
    }
  }
  
  button {
    font-family: ${({ theme }) => theme.fonts.accent}, ${({ theme }) => theme.fonts.fallback};
    cursor: pointer;
    user-select: none;
  }
  
  input, textarea, select {
    font-family: ${({ theme }) => theme.fonts.primary}, ${({ theme }) => theme.fonts.fallback};
    
    &::placeholder {
      color: ${({ theme }) => theme.colors.navyLight};
      opacity: 0.6;
    }
  }
  
  /* For accent text */
  .accent {
    font-family: ${({ theme }) => theme.fonts.accent}, ${({ theme }) => theme.fonts.fallback};
    color: ${({ theme }) => theme.colors.purple};
  }
  
  /* Gradient text */
  .gradient-text {
    background: ${({ theme }) => theme.gradients.umortgageDiagonal};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
  }
`;