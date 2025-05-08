// src/components/ui/GlowContainer.jsx
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

/**
 * GlowContainer - A standardized container with glow effects
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

  // Border color based on active state
  const borderColor = isActive 
    ? 'border-[var(--highlight-color)]' 
    : 'border-white/20';

  return (
    <motion.div
      ref={ref}
      className={`bg-black/50 backdrop-blur-[30px] rounded-lg border-2 ${borderColor} z-10 ${className}`}
      whileHover={whileHover}
      onClick={onClick}
      style={{
        boxShadow: shadowIntensities[intensity],
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: 'transform, box-shadow'
      }}
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
  intensity: PropTypes.oneOf(['low', 'medium', 'high'])
};

export default GlowContainer;