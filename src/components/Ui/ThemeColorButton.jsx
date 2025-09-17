// src/components/ui/ThemeColorButton.jsx
import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import GlowText from './GlowText';
import Button from './Button';
import CustomColorPicker from './CustomColorPicker';
import { FaPalette, FaPlus } from "react-icons/fa";
import { GetColors } from '../../data/themeColors'

/**
 * ThemeColorButton - A button that allows users to change the theme color
 */
const ThemeColorButton = () => {
  const { changeColor, currentTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [showCustomPicker, setShowCustomPicker] = useState(false);

  // Predefined theme colors
  const themeColors = GetColors();

  // Check if current theme is a custom color (not in predefined colors)
  const isCustomColor = useCallback(() => {
    return !themeColors.some(color => color.value === currentTheme);
  }, [themeColors, currentTheme]);

  const [customColor, setCustomColor] = useState(() => {
    // Initialize with current theme if it's a custom color
    const isCustom = !themeColors.some(color => color.value === currentTheme);
    if (isCustom) {
      const rgb = currentTheme.split(',').map(c => parseInt(c.trim()));
      return `#${rgb.map(c => c.toString(16).padStart(2, '0')).join('')}`;
    }
    return '#00ffff';
  });

  const toggleDropdown = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleColorSelect = useCallback((colorValue) => {
    changeColor(colorValue);
    setIsOpen(false);
    setShowCustomPicker(false);
  }, [changeColor]);

  // Convert hex color to RGB format
  const hexToRgb = useCallback((hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ?
      `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` :
      '0, 255, 255';
  }, []);

  // Custom color picker callbacks
  const handleCustomColorApply = useCallback((color) => {
    const rgbValue = hexToRgb(color);
    changeColor(rgbValue);
    setCustomColor(color); // Update the custom color state
    setIsOpen(false);
    setShowCustomPicker(false);
  }, [hexToRgb, changeColor]);

  const handleCustomColorCancel = useCallback(() => {
    setShowCustomPicker(false);
  }, []);

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
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          size="sm"
          className="p-2 relative group border-none drop-shadow-none shadow-none focus:outline-none focus:ring-0 focus:ring-offset-0"
          onClick={toggleDropdown}
          aria-label="Change theme color"
          aria-expanded={isOpen}
        >
          <GlowText>
            <FaPalette size={20} />
          </GlowText>
        </Button>
      </motion.div>

      {/* Color dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 mt-2 py-2 w-64 bg-black/90 backdrop-blur-md rounded-md z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              boxShadow: 'var(--box-shadow-md)'
            }}
          >
            {/* Predefined colors */}
            {themeColors.map((color, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 3 }}
                className='w-full'
              >
                <button
                  className='w-full px-4 py-2 text-left flex items-center gap-2 rounded-md transition-all duration-200 hover:bg-white/5 border border-transparent'
                  onClick={() => handleColorSelect(color.value)}
                  style={{
                    textShadow: color.value === currentTheme
                      ? 'var(--text-shadow-md)'
                      : 'none',
                    color: 'var(--highlight-color)'
                  }}
                >
                  <span
                    className={`h-3 w-3 rounded-full inline-block`}
                    style={{ background: `rgb(${color.value})`, boxShadow: `0 0 4px rgb(${color.value})` }}
                  />
                  <GlowText intensity={color.value === currentTheme ? "medium" : "none"}>
                    {color.name}
                  </GlowText>
                </button>
              </motion.div>
            ))}


            {/* Custom color option */}
            <motion.div whileHover={{ x: 3 }} className='w-full'>
              <button
                className='w-full px-4 py-2 text-left flex items-center gap-2 rounded-md transition-all duration-200 hover:bg-white/5 border border-transparent'
                onClick={() => setShowCustomPicker(!showCustomPicker)}
                style={{
                  textShadow: isCustomColor()
                    ? 'var(--text-shadow-md)'
                    : 'none',
                  color: 'var(--highlight-color)'
                }}
              >
                <span
                  className={`h-3 w-3 rounded-full flex items-center justify-center`}
                  style={{
                    background: isCustomColor() ? `rgb(${currentTheme})` : '#000000',
                    border: isCustomColor() ? 'none' : '1px solid #666',
                    boxShadow: isCustomColor() ? `0 0 4px rgb(${currentTheme})` : 'none'
                  }}
                >
                  {!isCustomColor() && <FaPlus size={8} className="text-gray-400" />}
                </span>
                <GlowText
                  intensity={isCustomColor() ? "medium" : "none"}
                  style={{
                    color: isCustomColor() ? `rgb(${currentTheme})` : 'var(--highlight-color)'
                  }}
                >
                  Custom Color
                </GlowText>
              </button>
            </motion.div>

            {/* Custom color picker */}
            {showCustomPicker && (
              <motion.div
                className="border-t border-gray-600/30"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <CustomColorPicker
                  key={`custom-color-picker-${customColor}`}
                  initialColor={customColor}
                  onApply={handleCustomColorApply}
                  onCancel={handleCustomColorCancel}
                />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeColorButton;