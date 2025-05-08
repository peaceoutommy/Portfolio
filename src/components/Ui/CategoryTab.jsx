// src/components/ui/CategoryTab.jsx
import { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import GlowText from './GlowText';

/**
 * CategoryTab - A standardized tab component for category selection
 */
const CategoryTab = ({ 
  label, 
  icon, 
  isActive, 
  onClick, 
  index = 0,
  inView = true
}) => {
  return (
    <motion.button
      className={`px-5 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 ${
        isActive
          ? 'bg-[var(--highlight-color)]/20 border-2 border-[var(--highlight-color)]'
          : 'bg-black/40 border-2 border-white/10 text-white/70 hover:border-white/30'
      }`}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        scale: 1.03,
        boxShadow: isActive
          ? 'var(--box-shadow-md)'
          : 'var(--box-shadow-sm)'
      }}
      whileTap={{ scale: 0.98 }}
      aria-pressed={isActive}
      style={{
        boxShadow: isActive ? 'var(--box-shadow-sm)' : 'none'
      }}
    >
      {icon && <i className={`${icon} mr-2`} aria-hidden="true"></i>}
      <GlowText intensity={isActive ? 'high' : 'low'}>
        {label}
      </GlowText>
    </motion.button>
  );
};

CategoryTab.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number,
  inView: PropTypes.bool
};

export default memo(CategoryTab);