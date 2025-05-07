import { useCallback } from 'react';

export function useScrollToSection() {
  const scrollToSection = useCallback((id, options = {}) => {
    const { 
      offset = 180, 
      duration = 1, 
      onComplete = null 
    } = options;
    
    const section = document.getElementById(id);
    if (!section) return;
    
    // Cancel any ongoing scroll animations
    if (window.scrollAnimationFrame) {
      cancelAnimationFrame(window.scrollAnimationFrame);
    }
    
    const elementPosition = section.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - offset;

    // Custom smooth scroll implementation
    const startPosition = window.scrollY;
    const distance = offsetPosition - startPosition;
    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percent = Math.min(progress / duration, 1);
      
      // Easing function
      const easeInOutQuad = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      
      window.scrollTo(0, startPosition + distance * easeInOutQuad(percent));
      
      if (progress < duration) {
        window.scrollAnimationFrame = requestAnimationFrame(step);
      } else if (onComplete && typeof onComplete === 'function') {
        onComplete();
      }
    }
    
    window.scrollAnimationFrame = requestAnimationFrame(step);
  }, []);

  return scrollToSection;
}