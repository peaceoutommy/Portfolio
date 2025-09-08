// src/components/ui/CategoryTab.jsx
import { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import GlowText from './GlowText';
import Button from './Button';

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: inView ? 1 : 0, 
        y: inView ? 0 : 20,
      }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Button
        variant={isActive ? "active" : "default"}
        size="md"
        className="px-5 py-3 flex items-center gap-2"
        onClick={onClick}
        aria-pressed={isActive}
        style={{
          boxShadow: isActive ? 'var(--box-shadow-sm)' : 'none',
        }}
      >
        {icon && (
          <i 
            className={`${icon} text-[var(--highlight-color)]`} 
            style={{ 
              textShadow: isActive 
                ? 'var(--text-shadow-md)' 
                : 'var(--text-shadow-sm)',
            }}
            aria-hidden="true"
          />
        )}
        <GlowText intensity={isActive ? 'medium' : 'low'}>
          {label}
        </GlowText>
      </Button>
    </motion.div>
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