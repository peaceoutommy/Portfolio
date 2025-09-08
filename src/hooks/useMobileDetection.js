// src/hooks/useMobileDetection.js
import { useState, useEffect } from 'react';

/**
 * Custom hook for detecting mobile devices based on screen width
 * Replaces duplicate mobile detection logic across multiple components
 * 
 * @param {number} breakpoint - The breakpoint in pixels (default: 640)
 * @returns {boolean} - Whether the device is considered mobile
 * 
 * @example
 * const isMobile = useMobileDetection(768); // Custom breakpoint
 * const isMobile = useMobileDetection();    // Default 640px
 */
export const useMobileDetection = (breakpoint = 640) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);
  
  return isMobile;
};