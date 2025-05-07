import { memo } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const THEME_COLORS = ['#ff00ff', '#ffffff', '#00ffff', '#ff0000', '#00ff00'];

const ThemeColorButton = () => {
  const { highlightColor, setThemeColor } = useTheme();

  const handleColorClick = () => {
    const currentIndex = THEME_COLORS.indexOf(highlightColor);
    const nextIndex = (currentIndex + 1) % THEME_COLORS.length;
    setThemeColor(THEME_COLORS[nextIndex]);
  };

  return (
    <button
      onClick={handleColorClick}
      className="w-6 h-6 rounded border border-gray-400 glass transition-all duration-300 hover:opacity-90"
      style={{ backgroundColor: highlightColor }}
      title="Click to change theme color"
      aria-label="Change theme color"
    />
  );
};

export default memo(ThemeColorButton);