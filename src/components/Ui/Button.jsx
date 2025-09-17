import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Icons from './Icons';

/**
 * Button component with input-like focus behavior
 * Supports multiple variants, sizes, and polymorphic rendering
 */
const Button = forwardRef(({ 
  children, 
  variant = 'default',
  size = 'md',
  as = 'button',
  loading = false,
  disabled = false,
  className = '', 
  onClick,
  ...props
}, ref) => {
  const Component = as;
  const isDisabled = disabled || loading;

  // Styling configuration
  const baseClasses = "inline-flex items-center justify-center rounded-md border-2 text-[var(--highlight-color)] transition-all duration-200 relative overflow-hidden group font-medium focus:outline-none focus:ring-2 focus:ring-[var(--highlight-color)]/50 focus:ring-offset-2";
  
  const variants = {
    default: "border-[var(--border-primary)] hover:border-[var(--border-secondary)] focus:border-[var(--highlight-color)]",
    active: "border-[var(--highlight-color)] "
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const disabledClasses = isDisabled 
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "cursor-pointer";
  
  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`;
  
  const handleClick = (e) => {
    if (isDisabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return (
    <motion.div
      className="inline-block"
      whileHover={isDisabled ? {} : { scale: 1.01 }}
      whileTap={isDisabled ? {} : { scale: 0.98 }}
      transition={{ duration: 0.1 }}
    >
      <Component
        ref={ref}
        className={buttonClasses}
        disabled={isDisabled}
        onClick={handleClick}
        style={{
          textShadow: isDisabled ? 'none' : '0 0 4px var(--highlight-color)',
          boxShadow: 'var(--box-shadow-sm)',
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
        
        {/* Glow effect on hover */}
        <span 
          className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
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
  variant: PropTypes.oneOf(['default', 'active']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;