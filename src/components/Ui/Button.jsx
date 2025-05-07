import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const Button = forwardRef(({ 
  children, 
  primary = false, 
  className = '', 
  disabled = false,
  onClick,
  ...props
}, ref) => {
  const baseClasses = "px-6 py-3 rounded-lg border-2 neon-text-hover transition-all duration-300 relative overflow-hidden group";
  const primaryClasses = "bg-[var(--highlight-color)]/20 border-[var(--highlight-color)] hover:bg-[var(--highlight-color)]/30";
  const secondaryClasses = "border-[var(--highlight-color)] hover:bg-[var(--highlight-color)]/10";
  
  return (
    <motion.button
      ref={ref}
      className={`${baseClasses} ${primary ? primaryClasses : secondaryClasses} ${className}`}
      disabled={disabled}
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
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