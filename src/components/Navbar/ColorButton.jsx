import { useCallback } from 'react';

const ColorButton = ({ highlightColor, onColorChange }) => {
    const colors = ['#ff00ff', '#ffffff', '#00ffff', '#ff0000', '#00ff00'];

    const handleColorClick = useCallback(() => {
        const currentIndex = colors.indexOf(highlightColor);
        const nextIndex = (currentIndex + 1) % colors.length;
        onColorChange(colors[nextIndex]);
    }, [colors, highlightColor, onColorChange]);

    return (
        <li className="flex items-center gap-2">
            <button
                onClick={handleColorClick}
                className="w-6 h-6 rounded border border-gray-400 glass transition-all duration-300 hover:opacity-90"
                style={{ backgroundColor: highlightColor }}
                title="Click to change theme color"
                aria-label="Change theme color"
            />
        </li>
    );
};

export default ColorButton;