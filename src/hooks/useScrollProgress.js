// src/hooks/useScrollProgress.js
import { useRef, useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for scroll-based progress animation
 * Highly optimized for performance with single scroll listener
 * 
 * @param {Object} options - Configuration options
 * @param {number} options.startThreshold - When to start progress (0-1, default: 0.8)
 * @param {number} options.endThreshold - When to end progress (0-1, default: 0.2)
 * @returns {Object} - { timelineRef, progress, opacity }
 */
export const useScrollProgress = ({ 
  startThreshold = 0.8, 
  endThreshold = 0.2 
} = {}) => {
  const timelineRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [opacity, setOpacity] = useState(0);

  // ✅ OPTIMIZED: Memoize the progress calculation
  const calculateProgress = useCallback(() => {
    if (!timelineRef.current) return;

    const timelineRect = timelineRef.current.getBoundingClientRect();
    const timelineTop = timelineRect.top;
    const timelineHeight = timelineRect.height;
    const windowHeight = window.innerHeight;
    
    const viewportThreshold = windowHeight * startThreshold;
    
    // Early return if not in view
    if (timelineTop > viewportThreshold) {
      setProgress(0);
      setOpacity(0);
      return;
    }
    
    // Calculate progress
    const startPoint = viewportThreshold;
    const endPoint = -timelineHeight + windowHeight * endThreshold;
    const adjustedProgress = (startPoint - timelineTop) / (startPoint - endPoint);
    const newProgress = Math.max(0, Math.min(adjustedProgress, 1));

    setProgress(newProgress);
    setOpacity(newProgress > 0 ? 1 : 0);
  }, [startThreshold, endThreshold]);

  useEffect(() => {
    let rafId = null;
    let isScrolling = false;

    const handleScroll = () => {
      if (!isScrolling) {
        isScrolling = true;
        rafId = requestAnimationFrame(() => {
          calculateProgress();
          isScrolling = false;
        });
      }
    };

    // Initial calculation
    calculateProgress();

    // Add optimized scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', calculateProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateProgress);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [calculateProgress]);

  return { timelineRef, progress, opacity };
};