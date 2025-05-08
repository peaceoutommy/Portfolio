// src/contexts/ThemeContext.js
import { createContext, useContext, useState, useEffect } from 'react';

// Default theme color (Cyan)
const DEFAULT_THEME = '0, 255, 255';

// Create context
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Get saved theme from localStorage or use default
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme-color');
    return savedTheme || DEFAULT_THEME;
  });

  // Update theme color variables and save to localStorage
  const changeColor = (colorValue) => {
    setCurrentTheme(colorValue);
    localStorage.setItem('theme-color', colorValue);
    
    // Update CSS variables
    document.documentElement.style.setProperty('--highlight-rgb', colorValue);
    document.documentElement.style.setProperty('--highlight-color', `rgb(${colorValue})`);
  };

  // Initialize theme on mount
  useEffect(() => {
    // Set the theme from state
    document.documentElement.style.setProperty('--highlight-rgb', currentTheme);
    document.documentElement.style.setProperty('--highlight-color', `rgb(${currentTheme})`);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, changeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for using the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};