// src/contexts/ThemeContext.js
import { createContext, useContext, useState, useEffect, useMemo } from 'react';

// Default theme color (Cyan)
const DEFAULT_THEME = '0, 255, 255';

// Create context
const ThemeContext = createContext();

// Function to determine if a color is dark (needs light mode)
const isDarkColor = (rgbString) => {
  const [r, g, b] = rgbString.split(',').map(c => parseInt(c.trim()));
  // Calculate luminance using relative luminance formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  // If luminance is below 0.3, consider it dark
  return luminance < 0.3;
};

export const ThemeProvider = ({ children }) => {
  // Get saved theme from localStorage or use default
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme-color');
    return savedTheme || DEFAULT_THEME;
  });

  // Determine if current theme is dark (needs light mode)
  const isLightMode = useMemo(() => {
    return isDarkColor(currentTheme);
  }, [currentTheme]);

  // Update theme color variables and save to localStorage
  const changeColor = (colorValue) => {
    setCurrentTheme(colorValue);
    localStorage.setItem('theme-color', colorValue);
    
    // Update CSS variables
    document.documentElement.style.setProperty('--highlight-rgb', colorValue);
    document.documentElement.style.setProperty('--highlight-color', `rgb(${colorValue})`);
    
    // Update light mode class on document
    const isDark = isDarkColor(colorValue);
    if (isDark) {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  };

  // Initialize theme on mount
  useEffect(() => {
    // Set the theme from state
    document.documentElement.style.setProperty('--highlight-rgb', currentTheme);
    document.documentElement.style.setProperty('--highlight-color', `rgb(${currentTheme})`);
    
    // Set initial light mode class
    if (isLightMode) {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  }, [currentTheme, isLightMode]);

  return (
    <ThemeContext.Provider value={{ currentTheme, changeColor, isLightMode }}>
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