import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/**
 * Tag - A reusable tag component with highlight color text and border that becomes gradient on hover
 * Features:
 * - Skewed design for visual appeal
 * - Highlight color border by default
 * - Highlight color text always
 * - Gradient border from highlight color to white on hover
 * - Smooth hover animations
 */
const Tag = ({ 
  children, 
  className = '', 
  ...props 
}) => {
  const baseClasses = `
    px-3 py-1 text-xs
    transition-all
    duration-200
    select-none
    ease-in-out
    relative
    overflow-hidden
    group
    ${className}
  `.trim();

  return (
    <motion.div
      className={baseClasses}
      style={{ 
        transform: 'skew(-24deg)',
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        WebkitFontSmoothing: 'antialiased'
      }}
      whileHover="hover"
      initial="initial"
      variants={{
        initial: {},
        hover: {}
      }}
      {...props}
    >
      {/* Base border - solid highlight color */}
      <div
        className="absolute inset-0 rounded-sm"
        style={{
          padding: '1px',
          background: 'var(--highlight-color)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden'
        }}
      />
      
      {/* Gradient border overlay - fades in on hover */}
      <motion.div
        className="absolute inset-0 rounded-sm"
        style={{
          padding: '1px',
          background: 'linear-gradient(90deg, var(--highlight-color) 0%, rgba(255, 255, 255, 0.8) 100%)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          willChange: 'opacity',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden'
        }}
        variants={{
          initial: { 
            opacity: 0 
          },
          hover: { 
            opacity: 1 
          }
        }}
        transition={{ 
          duration: 0.2,
          ease: "easeInOut"
        }}
      />
      
      {/* Content with highlight color text */}
      <div 
        className="relative z-10"
        style={{ 
          transform: 'skew(24deg)',
          color: 'var(--highlight-color)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          WebkitFontSmoothing: 'antialiased'
        }}
      >
        {children}
      </div>
    </motion.div>
  );
};

Tag.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default Tag;