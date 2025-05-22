// src/hooks/useParticles.js
import { useMemo } from 'react';

/**
 * Custom hook to generate particle data for backgrounds
 * 
 * @param {Object} options - Configuration options
 * @param {number} options.count - Number of particles to generate (default: 50)
 * @param {number} options.minSize - Minimum particle size in pixels (default: 1)
 * @param {number} options.maxSize - Maximum particle size in pixels (default: 4)
 * @param {Object} options.speed - Particle animation speed range
 * @param {number} options.speed.min - Minimum animation duration in seconds (default: 20)
 * @param {number} options.speed.max - Maximum animation duration in seconds (default: 50)
 * @returns {Array} - Array of particle objects with properties for rendering
 */
export const useParticles = (options = {}) => {
  const {
    count = 50,
    minSize = 1,
    maxSize = 4,
    speed = {
      min: 20,
      max: 50
    }
  } = options;
  
  // Generate particles once and memoize the result
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, index) => {
      // Generate random properties for each particle
      const size = Math.random() * (maxSize - minSize) + minSize;
      const posX = Math.random() * 100; // Random position as percentage of container
      const posY = Math.random() * 100;
      const opacity = (Math.random() * 0.5) + 0.1; // Random opacity between 0.1 and 0.6
      const delay = Math.random() * 5; // Random delay for animation start (0-5s)
      const duration = Math.random() * (speed.max - speed.min) + speed.min; // Random animation duration
      
      return {
        id: `particle-${index}`,
        size,
        posX,
        posY,
        opacity,
        delay,
        duration
      };
    });
  }, [count, minSize, maxSize, speed.min, speed.max]);
  
  return particles;
};