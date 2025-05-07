import { useEffect, useRef, useState } from 'react';

export function useParticles(options = {}) {
  const {
    count = window.innerWidth > 768 ? 50 : 25,
    minSize = 1,
    maxSize = 5,
    speed = { min: 10, max: 30 }
  } = options;
  
  const [particles, setParticles] = useState([]);
  const isInitializedRef = useRef(false);
  
  useEffect(() => {
    // Only create particles once
    if (isInitializedRef.current) return;
    
    const newParticles = Array.from({ length: count }).map(() => {
      // Random properties
      const size = Math.random() * (maxSize - minSize) + minSize;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * (speed.max - speed.min) + speed.min;
      const opacity = Math.random() * 0.5 + 0.1;
      
      return {
        size,
        posX,
        posY,
        delay,
        duration,
        opacity,
        id: Math.random().toString(36).substring(2, 9) // Unique ID
      };
    });
    
    setParticles(newParticles);
    isInitializedRef.current = true;
    
    // No DOM cleanup needed as we're using React components
    return () => {
      isInitializedRef.current = false;
    };
  }, [count, minSize, maxSize, speed.min, speed.max]);

  return particles;
}