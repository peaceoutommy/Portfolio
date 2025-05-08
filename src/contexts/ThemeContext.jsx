import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const DEFAULT_COLOR = '#00ffff';
const THEME_STORAGE_KEY = 'portfolioThemeColor';

export const ThemeProvider = ({ children }) => {
  const [highlightColor, setHighlightColor] = useState(DEFAULT_COLOR);

  // Load saved theme on initial mount
  useEffect(() => {
    const storedColor = localStorage.getItem(THEME_STORAGE_KEY);
    if (storedColor) {
      setHighlightColor(storedColor);
    }
  }, []);

  // Update CSS variables when color changes
  useEffect(() => {
    document.documentElement.style.setProperty('--highlight-color', highlightColor);

    // Extract RGB values for other CSS variables
    const r = parseInt(highlightColor.slice(1, 3), 16);
    const g = parseInt(highlightColor.slice(3, 5), 16);
    const b = parseInt(highlightColor.slice(5, 7), 16);
    document.documentElement.style.setProperty('--highlight-rgb', `${r}, ${g}, ${b}`);
  }, [highlightColor]);

  const setThemeColor = (newColor) => {
    setHighlightColor(newColor);
    localStorage.setItem(THEME_STORAGE_KEY, newColor);
  };

  const value = {
    highlightColor,
    setThemeColor,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};