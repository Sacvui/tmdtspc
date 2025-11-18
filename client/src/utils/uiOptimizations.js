// UI Optimization Constants and Utilities
// Design System for consistent styling

export const COLORS = {
  primary: '#1a5ca2',
  primaryLight: '#3eb4a8',
  secondary: '#64748b',
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  background: '#f8fafc',
  white: '#fff',
  text: {
    primary: '#1e293b',
    secondary: '#64748b',
    light: '#94a3b8'
  },
  border: {
    light: '#e2e8f0',
    medium: '#cbd5e1',
    dark: '#94a3b8'
  }
};

export const SPACING = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '32px',
  '4xl': '40px',
  '5xl': '60px'
};

export const TYPOGRAPHY = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  sizes: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
    '4xl': '40px',
    '5xl': '48px'
  },
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800
  }
};

export const SHADOWS = {
  sm: '0 1px 2px rgba(0,0,0,0.05)',
  md: '0 4px 6px rgba(0,0,0,0.07)',
  lg: '0 10px 15px rgba(0,0,0,0.1)',
  xl: '0 20px 25px rgba(0,0,0,0.1)',
  '2xl': '0 25px 50px rgba(0,0,0,0.15)',
  primary: '0 4px 12px rgba(26, 92, 162, 0.3)',
  primaryHover: '0 8px 20px rgba(26, 92, 162, 0.4)'
};

export const BORDER_RADIUS = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  full: '9999px'
};

export const TRANSITIONS = {
  fast: '0.15s ease',
  normal: '0.2s ease',
  slow: '0.3s ease',
  smooth: '0.4s cubic-bezier(0.4, 0, 0.2, 1)'
};

// Common button styles
export const getButtonStyle = (variant = 'primary', isActive = false) => {
  const baseStyle = {
    padding: '12px 24px',
    borderRadius: BORDER_RADIUS.md,
    border: 'none',
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.semibold,
    cursor: 'pointer',
    transition: TRANSITIONS.normal,
    outline: 'none'
  };

  if (variant === 'primary') {
    return {
      ...baseStyle,
      background: isActive 
        ? `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})` 
        : COLORS.primary,
      color: COLORS.white,
      boxShadow: isActive ? SHADOWS.primary : 'none'
    };
  }

  if (variant === 'secondary') {
    return {
      ...baseStyle,
      background: isActive ? '#e2e8f0' : '#f1f5f9',
      color: isActive ? COLORS.primary : COLORS.text.secondary
    };
  }

  return baseStyle;
};

// Card hover effect
export const getCardHoverStyle = () => ({
  transition: TRANSITIONS.smooth,
  cursor: 'pointer'
});

// Focus styles for accessibility
export const getFocusStyle = () => ({
  outline: 'none',
  boxShadow: `0 0 0 3px rgba(26, 92, 162, 0.2)`
});

// Responsive breakpoints
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
  wide: 1536
};

// Media query helper
export const mediaQuery = (breakpoint) => {
  return `@media (min-width: ${breakpoint}px)`;
};

