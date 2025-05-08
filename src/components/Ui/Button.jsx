import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

/**
 * Button - A standardized button component with consistent styling
 */
const Button = forwardRef(({ 
  children, 
  primary = false, 
  className = '', 
  disabled = false,
  onClick,
  ...props
}, ref) => {
  // Common button classes
  const baseClasses = "px-6 py-3 rounded-lg border-2 text-[var(--highlight-color)] transition-all duration-300 relative overflow-hidden group";
  
  // Primary vs secondary button styling
  const primaryClasses = "bg-[var(--highlight-color)]/20 border-[var(--highlight-color)] hover:bg-[var(--highlight-color)]/30";
  const secondaryClasses = "border-[var(--highlight-color)] hover:bg-[var(--highlight-color)]/10";
  
  // Text shadow effect
  const textShadow = "text-shadow-md hover:text-shadow-lg";
  
  // Combine all classes
  const buttonClasses = `${baseClasses} ${primary ? primaryClasses : secondaryClasses} ${textShadow} ${className}`;
  
  return (
    <motion.button
      ref={ref}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      style={{
        textShadow: '0 0 4px var(--highlight-color)',
        boxShadow: '0 0 8px rgba(var(--highlight-rgb), 0.2)',
      }}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-[var(--highlight-color)]/0 group-hover:bg-[var(--highlight-color)]/10 transition-all duration-300"></span>
    </motion.button>
  );
});

Button.displayName = 'Button';

Button.propTypes = {
  children: PropTypes.node.isRequired,
  primary: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

export default Button;