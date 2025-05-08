// src/components/ui/ThemeColorButton.jsx
import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import GlowText from './GlowText';

/**
 * ThemeColorButton - A button that allows users to change the theme color
 */
const ThemeColorButton = () => {
  const { changeColor, currentTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  // Predefined theme colors
  const themeColors = [
    { name: 'Cyan', value: '0, 255, 255' },
    { name: 'Purple', value: '183, 0, 255' },
    { name: 'Green', value: '0, 255, 128' },
    { name: 'Orange', value: '255, 128, 0' },
    { name: 'Pink', value: '255, 0, 183' }
  ];

  const toggleDropdown = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleColorSelect = useCallback((colorValue) => {
    changeColor(colorValue);
    setIsOpen(false);
  }, [changeColor]);

  // Close dropdown when scrolling or clicking outside
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.theme-color-dropdown-container')) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative theme-color-dropdown-container">
      <motion.button
        className="p-2 rounded-lg border-2 border-[var(--highlight-color)]/50 transition-all duration-300 relative group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={toggleDropdown}
        aria-label="Change theme color"
        aria-expanded={isOpen}
        style={{
          background: 'rgba(var(--highlight-rgb), 0.1)',
          boxShadow: 'var(--box-shadow-sm)'
        }}
      >
        <GlowText intensity="medium">
          <i className="fas fa-palette"></i>
        </GlowText>
        <span className="absolute inset-0 bg-[var(--highlight-color)]/0 group-hover:bg-[var(--highlight-color)]/20 transition-all duration-300 rounded-lg"></span>
      </motion.button>

      {/* Color dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 mt-2 py-2 w-36 bg-black/90 backdrop-blur-md rounded-lg border-2 border-[var(--highlight-color)]/30 z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              boxShadow: 'var(--box-shadow-md)'
            }}
          >
            {themeColors.map((color, index) => (
              <motion.button
                key={index}
                className="w-full px-4 py-2 text-left flex items-center gap-2 transition-all duration-300 hover:bg-[var(--highlight-color)]/10"
                onClick={() => handleColorSelect(color.value)}
                whileHover={{ x: 3 }}
                style={{
                  textShadow: color.value === currentTheme 
                    ? 'var(--text-shadow-md)' 
                    : 'none'
                }}
              >
                <span 
                  className={`h-3 w-3 rounded-full inline-block`}
                  style={{ background: `rgb(${color.value})`, boxShadow: `0 0 4px rgb(${color.value})` }}
                />
                <GlowText intensity={color.value === currentTheme ? "medium" : "low"}>
                  {color.name}
                </GlowText>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeColorButton;