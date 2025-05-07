import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const Card = forwardRef(({ 
  children, 
  className = '', 
  onClick, 
  whileHover = { y: -5 },
  isActive = false,
  ...props 
}, ref) => {
  return (
    <motion.div
      ref={ref}
      className={`bg-black/50 backdrop-blur-[30px] rounded-lg border-2 border-white/20 z-10 shadow-lg ${className}`}
      whileHover={whileHover}
      onClick={onClick}
      style={{
        boxShadow: isActive 
          ? `0 0 15px rgba(var(--highlight-rgb), 0.5)` 
          : `0 0 5px rgba(var(--highlight-rgb), 0.1)`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: 'transform'
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
});

Card.displayName = 'Card';

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  whileHover: PropTypes.object,
  isActive: PropTypes.bool
};

export default Card;