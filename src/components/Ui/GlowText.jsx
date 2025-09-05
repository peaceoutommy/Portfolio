import { memo } from 'react';
import PropTypes from 'prop-types';

/**
 * GlowText - A standardized component for creating glowing text effects
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Text content
 * @param {string} props.as - HTML element to render (h1, h2, p, etc)
 * @param {string} props.intensity - Intensity of the glow effect (low, medium, high)
 * @param {boolean} props.hover - Whether to add hover effect
 * @param {string} props.className - Additional classes
 */
const GlowText = ({ 
  children, 
  as: Component = 'span',
  intensity = 'medium',
  hover = false,
  className = '',
  ...props 
}) => {
  // Base classes for all glow text
  const baseClasses = "text-[var(--highlight-color)] transition-all duration-300";
  
  // Shadow intensities
  const glowIntensities = {
    none: "",
    low: "text-shadow-sm",
    medium: "text-shadow-md",
    high: "text-shadow-lg"
  };
  
  // Add hover effect if requested
  const hoverClasses = hover ? "hover:text-shadow-md" : "";
  
  return (
    <Component 
      className={`${baseClasses} ${glowIntensities[intensity]} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

GlowText.propTypes = {
  children: PropTypes.node.isRequired,
  as: PropTypes.string,
  intensity: PropTypes.oneOf(['none', 'low', 'medium', 'high']),
  hover: PropTypes.bool,
  className: PropTypes.string
};

export default memo(GlowText);