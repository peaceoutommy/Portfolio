import { useState, useEffect } from 'react';

/**
 * Custom hook for controlling navbar visibility based on scroll direction
 * Shows navbar immediately when scrolling up, hides when scrolling down after 10px
 * Handles edge cases like reaching bottom of page
 * @returns {Object} - States for navbar visibility
 */
export const useNavbarScroll = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Check if we're at the bottom of the page
      const isBottomReached = 
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;
      
      setIsAtBottom(isBottomReached);
      
      // When scrolling down AND not at the top of the page, hide the navbar
      // But only if we're not at the bottom of the page (prevents false "scroll up" detection)
      if (currentScrollY > lastScrollY && currentScrollY > 10 && !isBottomReached) {
        setIsVisible(false);
      } 
      // When scrolling up OR at the top of the page, show the navbar
      else if ((currentScrollY < lastScrollY && !isBottomReached) || currentScrollY <= 0) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [lastScrollY, isAtBottom]);

  return {
    isVisible,
    isAtTop: lastScrollY <= 0,
    isAtBottom
  };
};

export default useNavbarScroll;