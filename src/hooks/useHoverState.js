// src/hooks/useHoverState.js
import { useState, useCallback } from 'react';

/**
 * Custom hook for managing hover state consistently across components
 * Replaces duplicate hover state management patterns
 * 
 * @param {any} initialValue - Initial value for hovered item (default: null)
 * @returns {Object} - Hover state management object
 * 
 * @example
 * const { handleMouseEnter, handleMouseLeave, isHovered } = useHoverState();
 * 
 * // In JSX:
 * <Card
 *   onMouseEnter={() => handleMouseEnter('card-id')}
 *   onMouseLeave={handleMouseLeave}
 *   isActive={isHovered('card-id')}
 * >
 */
export const useHoverState = (initialValue = null) => {
  const [hoveredItem, setHoveredItem] = useState(initialValue);
  
  const handleMouseEnter = useCallback((id) => {
    setHoveredItem(id);
  }, []);
  
  const handleMouseLeave = useCallback(() => {
    setHoveredItem(null);
  }, []);
  
  const isHovered = useCallback((id) => {
    return hoveredItem === id;
  }, [hoveredItem]);
  
  const clearHover = useCallback(() => {
    setHoveredItem(null);
  }, []);
  
  return { 
    hoveredItem, 
    handleMouseEnter, 
    handleMouseLeave, 
    isHovered,
    clearHover 
  };
};