import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  const [circles, setCircles] = useState([]);
  const isInitializedRef = useRef(false);
  const animationFrameRef = useRef(null);
  const containerRef = useRef(null);
  
  // Create circles once
  useEffect(() => {
    if (isInitializedRef.current) return;
    
    // Determine count based on screen size
    const circleCount = window.innerWidth > 1200 ? 8 : 
                        window.innerWidth > 768 ? 6 : 4;
    
    const newCircles = Array.from({ length: circleCount }).map((_, index) => {
      const size = Math.random() * 200 + 100; // Between 100-300px
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      
      // Random velocities - small values for subtle movement
      const vx = (Math.random() - 0.45) * 0.1;
      const vy = (Math.random() - 0.45) * 0.1;
      
      // Varying opacities - some more visible than others
      const opacity = Math.random() * 0.1 + 0.05; // Between 0.05-0.2
      
      // Varying blur levels
      const blur = Math.random() * 80 + 40; // Between 40-100px blur
      
      return {
        id: `circle-${index}`,
        size,
        x: startX,
        y: startY,
        vx,
        vy,
        opacity,
        blur
      };
    });
    
    setCircles(newCircles);
    isInitializedRef.current = true;
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      isInitializedRef.current = false;
    };
  }, []);
  
  // Animation logic
  useEffect(() => {
    if (!circles.length || !containerRef.current) return;
    
    const containerWidth = containerRef.current.offsetWidth;
    const containerHeight = containerRef.current.offsetHeight;
    
    const updateCircles = () => {
      setCircles(prevCircles => 
        prevCircles.map(circle => {
          let newX = circle.x + circle.vx;
          let newY = circle.y + circle.vy;
          let newVx = circle.vx;
          let newVy = circle.vy;
          
          // Bounce off edges
          if (newX < 0 || newX > 100) {
            newVx = -newVx;
            newX = newX < 0 ? 0 : 100;
          }
          
          if (newY < 0 || newY > 100) {
            newVy = -newVy;
            newY = newY < 0 ? 0 : 100;
          }
          
          // Very simple collision detection between circles
          // (simplified for performance reasons)
          prevCircles.forEach(otherCircle => {
            if (circle.id === otherCircle.id) return;
            
            // Calculate distance between circle centers
            const dx = (newX - otherCircle.x) * containerWidth / 100;
            const dy = (newY - otherCircle.y) * containerHeight / 100;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Check for collision (simplified)
            const minDistance = (circle.size + otherCircle.size) / 2;
            if (distance < minDistance) {
              // Simple bounce effect
              newVx = -newVx * 0.8;
              newVy = -newVy * 0.8;
            }
          });
          
          return {
            ...circle,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy
          };
        })
      );
      
      animationFrameRef.current = requestAnimationFrame(updateCircles);
    };
    
    animationFrameRef.current = requestAnimationFrame(updateCircles);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [circles.length]);
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-20 overflow-hidden"
      aria-hidden="true"
    >
      {circles.map(circle => (
        <motion.div
          key={circle.id}
          className="absolute rounded-full"
          style={{
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            left: `${circle.x}%`,
            top: `${circle.y}%`,
            background: `rgba(var(--highlight-rgb), ${circle.opacity})`,
            filter: `blur(${circle.blur}px)`,
            transform: 'translate(-50%, -50%)',
            willChange: 'left, top'
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;