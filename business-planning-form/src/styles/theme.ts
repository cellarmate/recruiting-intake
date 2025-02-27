export const theme = {
  colors: {
    // Primary colors
    navy: '#0A0F36',
 // UMortgage dark blue
    purple: '#7B68EE',
 // UMortgage purple
    
    // Secondary colors
    mint: '#71ECCA',
    teal: '#4ECDC4',
    grey: '#9E9E9E',
    magenta: '#B19CD9',
    lightBlue: '#6BBCFF',
    
    // Tints
    navyLight: '#8C91A4',
    purpleLight: '#C1ADF6',
    mintLight: '#BFF6E7',
    tealLight: '#8CE1EA',
    magentaLight: '#D9B3F7',
    greyLight: '#E7E7E7',
    
    white: '#FFFFFF',
    black: '#000000',
  },
  
  gradients: {
    purpleMagenta: 'linear-gradient(90deg, #7B68EE 0%, #B19CD9 100%)',
    purpleTeal: 'linear-gradient(90deg, #7B68EE 0%, #4ECDC4 100%)',
    purpleMint: 'linear-gradient(90deg, #7B68EE 0%, #71ECCA 100%)',
    umortgageButton: 'linear-gradient(90deg, #7B68EE 0%, #4ECDC4 100%)',
 // Purple to teal
    umortgageHeader: 'linear-gradient(135deg, #0A0F36 0%, #7B68EE 100%)', // Navy to purple
    umortgageAccent: 'linear-gradient(90deg, #4ECDC4 0%, #71ECCA 100%)', // Teal to mint
    umortgageCard: 'linear-gradient(180deg, rgba(123, 104, 238, 0.05) 0%, rgba(78, 205, 196, 0.05) 100%)', // Subtle background gradient
    umortgageDiagonal: 'linear-gradient(135deg, #7B68EE 0%, #4ECDC4 100%)', // Diagonal purple to teal
  },
  
  fonts: {
    primary: '"HK Nova", sans-serif',
    accent: '"Hepta Slab", serif',
    fallback: 'Arial, sans-serif',
  },
  
  fontWeights: {
    light: 300,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
    heavy: 900,
  },
  
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    xl: '16px',
    xxl: '24px',
    round: '50%',
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    xxxl: '64px',
  },
  
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.1)',
    large: '0 8px 16px rgba(0, 0, 0, 0.1)',
    card: '0 10px 30px rgba(10, 15, 54, 0.1)',
    button: '0 4px 10px rgba(123, 104, 238, 0.3)',
  },
  
  breakpoints: {
    mobile: '576px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1200px',
  },
};

export type Theme = typeof theme;