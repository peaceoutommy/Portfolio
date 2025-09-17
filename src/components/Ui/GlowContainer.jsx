// src/components/ui/GlowContainer.jsx
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

/**
 * GlowContainer - A standardized container with glow effects
 * Updated with smoother transitions
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Container content
 * @param {string} props.className - Additional classes
 * @param {function} props.onClick - Click handler
 * @param {Object} props.whileHover - Framer motion hover animation
 * @param {boolean} props.isActive - Whether the container is in active state (more intense glow)
 * @param {string} props.intensity - Glow intensity (low, medium, high)
 */
const GlowContainer = forwardRef(({ 
  children, 
  className = '', 
  onClick, 
  whileHover = { y: -5 },
  isActive = false,
  intensity = 'medium',
  ...props 
}, ref) => {
  // Intensity levels for box shadow
  const shadowIntensities = {
    none: '0px 0px 0px 0px',
    low: isActive 
      ? '0 0 10px rgba(var(--highlight-rgb), 0.3)'
      : '0 0 5px rgba(var(--highlight-rgb), 0.1)',
    medium: isActive 
      ? '0 0 15px rgba(var(--highlight-rgb), 0.5)'
      : '0 0 8px rgba(var(--highlight-rgb), 0.2)',
    high: isActive 
      ? '0 0 20px rgba(var(--highlight-rgb), 0.7), 0 0 30px rgba(var(--highlight-rgb), 0.3)'
      : '0 0 12px rgba(var(--highlight-rgb), 0.3)'
  };


  // Use extremely fast transitions for hover animations
  const transitionDuration = whileHover && whileHover.y ? 0.1 : 0.6;
  
  // Define animation variants for smooth transitions
  const containerVariants = {
    active: {
      boxShadow: shadowIntensities[intensity],
      borderColor: 'rgba(var(--highlight-rgb), 1)',
      transition: { 
        duration: transitionDuration,
        ease: [0.19, 1, 0.22, 1] // Custom ease for smoother effect
      }
    },
    inactive: {
      boxShadow: shadowIntensities[intensity].split(',')[0], // Get the first part of the shadow
      borderColor: 'var(--border-primary)',
      transition: { 
        duration: transitionDuration,
        ease: [0.19, 1, 0.22, 1]
      }
    }
  };

  // Enhanced whileHover with custom timing
  const enhancedWhileHover = whileHover && whileHover.y ? {
    ...whileHover,
    transition: {
      duration: 0.1,
      ease: [0.19, 1, 0.22, 1]
    }
  } : whileHover;

  return (
    <motion.div
      ref={ref}
      className={`backdrop-blur-[30px] rounded-md border-2 z-10 ${className}`}
      style={{
        backgroundColor: 'var(--bg-secondary)',
        willChange: 'transform, box-shadow, border-color'
      }}
      whileHover={enhancedWhileHover}
      onClick={onClick}
      variants={containerVariants}
      initial="inactive"
      animate={isActive ? "active" : "inactive"}
      transition={{ duration: transitionDuration }}
      {...props}
    >
      {children}
    </motion.div>
  );
});

GlowContainer.displayName = 'GlowContainer';

GlowContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  whileHover: PropTypes.object,
  isActive: PropTypes.bool,
  intensity: PropTypes.oneOf(['none', 'low', 'medium', 'high'])
};

export default GlowContainer;