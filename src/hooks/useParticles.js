import { useEffect, useRef } from 'react';

export function useParticles(options = {}) {
  const {
    containerRef,
    count = window.innerWidth > 768 ? 50 : 25,
    minSize = 1,
    maxSize = 5,
    speed = { min: 10, max: 30 }
  } = options;
  
  const particlesRef = useRef([]);
  const isInitializedRef = useRef(false);
  
  useEffect(() => {
    if (!containerRef?.current || isInitializedRef.current) return;
    
    const container = containerRef.current;
    const particles = [];
    
    // Create particles only once
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.classList.add('hero-particle');
      
      // Random properties
      const size = Math.random() * (maxSize - minSize) + minSize;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * (speed.max - speed.min) + speed.min;
      const opacity = Math.random() * 0.5 + 0.1;
      
      // Set particle styles
      Object.assign(particle.style, {
        width: `${size}px`,
        height: `${size}px`,
        left: `${posX}%`,
        top: `${posY}%`,
        opacity: opacity,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        background: 'var(--highlight-color)',
        boxShadow: '0 0 6px var(--highlight-color)',
        position: 'absolute',
        borderRadius: '50%',
        animation: 'float-particle infinite ease-in-out'
      });
      
      container.appendChild(particle);
      particles.push(particle);
    }
    
    particlesRef.current = particles;
    isInitializedRef.current = true;
    
    // Cleanup
    return () => {
      particles.forEach(particle => {
        if (particle.parentNode === container) {
          container.removeChild(particle);
        }
      });
      isInitializedRef.current = false;
    };
  }, [containerRef]); // Only depend on containerRef, not other props

  return particlesRef;
}