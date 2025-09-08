// src/hooks/useNavbarScroll.js - UPDATED TO INCLUDE ACTIVE SECTION
import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to handle navbar scroll behavior AND active section tracking
 * Now combines both functionalities to avoid multiple scroll listeners
 * 
 * @param {Array} sections - Array of section IDs to track for active section
 * @param {number} sectionOffset - Offset from top to determine active section (default: 200)
 * Returns:
 * - isVisible: Whether the navbar should be visible
 * - isAtTop: Whether the user is at the top of the page
 * - activeSection: ID of the currently active section
 */
export const useNavbarScroll = (sections = [], sectionOffset = 400) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [activeSection, setActiveSection] = useState('');
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // ✅ OPTIMIZED: Memoize the scroll handler to prevent recreation
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // ✅ NAVBAR VISIBILITY LOGIC
    if (currentScrollY < 80) {
      setIsAtTop(true);
      setIsVisible(true);
    } else {
      setIsAtTop(false);
      
      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - add threshold to prevent hiding on small scroll
        setIsVisible(false);
      }
    }
    
    // ✅ ACTIVE SECTION LOGIC (only if sections provided)
    if (sections.length > 0) {
      if (currentScrollY < 100) {
        setActiveSection('home');
      } else {
        // Find the section that is currently in view
        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            // If the section is in the viewport (with offset tolerance)
            if (rect.top <= sectionOffset && rect.bottom >= sectionOffset) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
      }
    }
    
    // Update last scroll position
    setLastScrollY(currentScrollY);
  }, [lastScrollY, sections, sectionOffset]);
  
  useEffect(() => {
    // ✅ PERFORMANCE: Use RAF for smooth scroll handling
    let rafId = null;
    let isScrolling = false;

    const optimizedScrollHandler = () => {
      if (!isScrolling) {
        isScrolling = true;
        rafId = requestAnimationFrame(() => {
          handleScroll();
          isScrolling = false;
        });
      }
    };
    
    // Add single optimized scroll event listener
    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
    
    // Initialize values
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', optimizedScrollHandler);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [handleScroll]);
  
  return { isVisible, isAtTop, activeSection };
};