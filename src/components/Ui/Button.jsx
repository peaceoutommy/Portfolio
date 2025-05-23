// src/components/ui/Button.jsx - ENHANCED VERSION
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Icons from './Icons';

/**
 * Enhanced Button component with multiple variants and polymorphic support
 * Now supports rendering as different elements (button, a, etc.)
 */
const Button = forwardRef(({ 
  children, 
  variant = 'primary',    // 'primary', 'outline', 'ghost'
  size = 'md',           // 'sm', 'md', 'lg'
  as = 'button',         // Element to render as (button, a, etc.)
  loading = false,       // Loading state
  disabled = false,
  className = '', 
  onClick,
  ...props
}, ref) => {
  const Component = as;

  // Combine loading and disabled states
  const isDisabled = disabled || loading;

  // Base classes shared by all variants
  const baseClasses = "inline-flex items-center justify-center rounded-lg border-2 text-[var(--highlight-color)] transition-all duration-300 relative overflow-hidden group font-medium focus:outline-none focus:ring-2 focus:ring-[var(--highlight-color)]/50 focus:ring-offset-2 focus:ring-offset-black";
  
  // Variant-specific styling
  const variants = {
    primary: "bg-[var(--highlight-color)]/20 border-[var(--highlight-color)] hover:bg-[var(--highlight-color)]/30 text-shadow-md hover:text-shadow-lg",
    outline: "border-[var(--highlight-color)] hover:bg-[var(--highlight-color)]/10 text-shadow-sm hover:text-shadow-md",
    ghost: "border-transparent hover:bg-[var(--highlight-color)]/5 hover:border-[var(--highlight-color)]/30 text-shadow-sm hover:text-shadow-md"
  };
  
  // Size variations
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  // Disabled styling
  const disabledClasses = isDisabled 
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "cursor-pointer";
  
  // Combine all classes
  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`;
  
  // Handle click for disabled state
  const handleClick = (e) => {
    if (isDisabled) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <motion.div
      className="inline-block"
      whileHover={isDisabled ? {} : { scale: 1.03 }}
      whileTap={isDisabled ? {} : { scale: 0.98 }}
      transition={{ duration: 0.15 }}
    >
      <Component
        ref={ref}
        className={buttonClasses}
        disabled={isDisabled}
        onClick={handleClick}
        style={{
          textShadow: '0 0 4px var(--highlight-color)',
          boxShadow: '0 0 8px rgba(var(--highlight-rgb), 0.2)',
        }}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {/* Loading spinner */}
          {loading && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Icons name="Loader2" className="w-4 h-4" />
            </motion.div>
          )}
          {children}
        </span>
        
        {/* Animated background overlay */}
        <span 
          className="absolute inset-0 bg-[var(--highlight-color)]/0 group-hover:bg-[var(--highlight-color)]/10 transition-all duration-300"
          aria-hidden="true"
        />
        
        {/* Glow effect on hover */}
        <span 
          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            boxShadow: '0 0 20px rgba(var(--highlight-rgb), 0.3)'
          }}
          aria-hidden="true"
        />
      </Component>
    </motion.div>
  );
});

Button.displayName = 'Button';

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'outline', 'ghost']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;