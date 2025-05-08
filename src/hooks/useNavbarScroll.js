// src/hooks/useNavbarScroll.js
import { useState, useEffect } from 'react';

/**
 * Custom hook to handle navbar scroll behavior
 * Returns:
 * - isVisible: Whether the navbar should be visible
 * - isAtTop: Whether the user is at the top of the page
 */
export const useNavbarScroll = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Check if user is at the top of the page
      if (currentScrollY < 80) {
        setIsAtTop(true);
      } else {
        setIsAtTop(false);
      }
      
      // Hide navbar when scrolling down, show when scrolling up
      // But always show when near the top
      if (currentScrollY < 80) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY + 20) {
        // Scrolling down - add some threshold to prevent hiding on small scroll
        setIsVisible(false);
      }
      
      // Update last scroll position
      setLastScrollY(currentScrollY);
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initialize values
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);
  
  return { isVisible, isAtTop };
};