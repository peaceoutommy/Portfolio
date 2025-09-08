import { motion } from 'framer-motion';
import GlowText from './GlowText';
import PixelChevron from './PixelChevron';

const ViewMore = ({ 
  isExpanded = false, 
  onClick, 
  expandedText = "View Less", 
  collapsedText = "View More",
  intensity = "medium",
  className = "",
  disabled = false,
  ariaLabel
}) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <motion.div
      className={`flex flex-col items-center ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={ariaLabel || (isExpanded ? expandedText : collapsedText)}
      whileHover={disabled ? {} : { y: -5 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <div className="view-more-text mb-4">
        <GlowText intensity={intensity}>
          {isExpanded ? expandedText : collapsedText}
        </GlowText>
      </div>

      <motion.div 
        className="flex flex-col"
        animate={{ rotate: isExpanded ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="chevron-first mb-2">
          <PixelChevron />
        </div>
        <div className="chevron-second">
          <PixelChevron />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ViewMore;