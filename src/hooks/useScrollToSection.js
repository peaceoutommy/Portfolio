// src/hooks/useScrollToSection.js
import { useCallback } from 'react';

/**
 * Custom hook for smooth scrolling to sections
 */
export const useScrollToSection = () => {
  const scrollToSection = useCallback((sectionId, options = {}) => {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    // Default options
    const defaultOptions = {
      offset: 80, // Default offset to account for fixed header
      behavior: 'smooth',
      onComplete: null
    };
    
    // Merge default options with provided options
    const scrollOptions = { ...defaultOptions, ...options };
    
    // Calculate the position to scroll to
    const sectionPosition = section.getBoundingClientRect().top;
    const offsetPosition = sectionPosition + window.pageYOffset - scrollOptions.offset;
    
    // Scroll to the section
    window.scrollTo({
      top: offsetPosition,
      behavior: scrollOptions.behavior
    });
    
    // Call the onComplete callback after scrolling
    if (typeof scrollOptions.onComplete === 'function') {
      // We need to estimate when the scrolling is done
      // Since there's no native event for this, we use setTimeout
      setTimeout(() => {
        scrollOptions.onComplete();
      }, 800); // Approximation based on typical scroll duration
    }
  }, []);
  
  return scrollToSection;
};