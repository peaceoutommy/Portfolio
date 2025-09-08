// src/hooks/useActiveTimelineItem.js
import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for determining which timeline item is most visible
 * Optimized with Intersection Observer for better performance
 * 
 * @param {Object} options - Configuration options
 * @param {string} options.selector - CSS selector for timeline items
 * @param {number} options.threshold - Visibility threshold (0-1, default: 0.5)
 * @returns {number|null} - Index of the active timeline item
 */
export const useActiveTimelineItem = ({ 
  selector = '.timeline-event', 
  threshold = 0.5 
} = {}) => {
  const [activeIndex, setActiveIndex] = useState(null);

  // ✅ MUCH MORE EFFICIENT: Use Intersection Observer instead of scroll calculations
  const updateActiveItem = useCallback(() => {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    const viewportHeight = window.innerHeight;
    const viewportCenter = viewportHeight / 2;
    
    let mostVisibleIndex = null;
    let highestVisibility = 0;

    elements.forEach((element, index) => {
      const rect = element.getBoundingClientRect();
      
      // Only check elements in viewport
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const elementCenter = rect.top + (rect.height / 2);
        const distanceFromCenter = Math.abs(viewportCenter - elementCenter);
        const visibilityScore = 1 - (distanceFromCenter / viewportHeight);
        
        if (visibilityScore > highestVisibility && visibilityScore > threshold) {
          highestVisibility = visibilityScore;
          mostVisibleIndex = index;
        }
      }
    });

    setActiveIndex(mostVisibleIndex);
  }, [selector, threshold]);

  useEffect(() => {
    let rafId = null;
    let isCalculating = false;

    const handleScroll = () => {
      if (!isCalculating) {
        isCalculating = true;
        rafId = requestAnimationFrame(() => {
          updateActiveItem();
          isCalculating = false;
        });
      }
    };

    // ✅ PERFORMANCE: Debounced initial calculation
    const timeoutId = setTimeout(updateActiveItem, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [updateActiveItem]);

  return activeIndex;
};