import { useState, useEffect } from 'react';

/**
 * Custom hook for controlling navbar visibility based on scroll direction
 * Shows navbar immediately when scrolling up, hides when scrolling down after 10px
 * @returns {Object} - States for navbar visibility
 */
export const useNavbarScroll = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile 
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial value
    checkMobile();
    
    // Update on resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // When scrolling down AND not at the top of the page, hide the navbar
      if (currentScrollY > lastScrollY && currentScrollY > 10) {
        setIsVisible(false);
      } 
      // When scrolling up OR at the top of the page, show the navbar
      else if (currentScrollY < lastScrollY || currentScrollY <= 0) {
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
  }, [lastScrollY]);

  return {
    isVisible,
    isAtTop: lastScrollY <= 0,
    isMobile
  };
};

export default useNavbarScroll;