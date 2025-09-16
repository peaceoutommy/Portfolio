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
    ease-in-out
    relative
    overflow-hidden
    group
    ${className}
  `.trim();

  return (
    <motion.div
      className={baseClasses}
      style={{ transform: 'skew(-24deg)' }}
      whileHover="hover"
      initial="initial"
      variants={{
        initial: {},
        hover: {}
      }}
      {...props}
    >
      {/* Border overlay - highlight color by default, gradient on hover */}
      <motion.div
        className="absolute inset-0 rounded-sm"
        style={{
          padding: '1px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
        variants={{
          initial: { background: 'var(--highlight-color)' },
          hover: { background: 'linear-gradient(90deg, var(--highlight-color) 0%, rgba(255, 255, 255, 0.8) 100%)' }
        }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Content with highlight color text */}
      <div 
        className="relative z-10 text-[var(--highlight-color)]"
        style={{ 
          transform: 'skew(24deg)',
          color: 'var(--highlight-color)'
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
