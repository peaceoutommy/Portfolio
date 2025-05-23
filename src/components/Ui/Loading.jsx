// src/components/ui/Loading.jsx
import { memo } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import GlowText from './GlowText';
import Icons from './Icons';
import { LOADING_VARIANTS } from '../../constants/animations';

/**
 * Standardized Loading component
 * Replaces all custom loading implementations across the app
 */
const Loading = ({ 
  text = "Loading...",
  variant = "pulse", // "pulse", "spin", "dots"
  size = "md", // "sm", "md", "lg"
  fullScreen = false,
  className = ""
}) => {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-xl", 
    lg: "text-3xl"
  };

  const containerClasses = fullScreen 
    ? "min-h-screen flex items-center justify-center"
    : "flex items-center justify-center py-8";

  const renderLoadingIcon = () => {
    switch (variant) {
      case "spin":
        return (
          <motion.div
            animate={LOADING_VARIANTS.spin}
            className="mb-4"
          >
            <Icons name="Loader2" className={size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-8 h-8' : 'w-6 h-6'} />
          </motion.div>
        );
        
      case "dots":
        return (
          <div className="flex gap-1 mb-4">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-[var(--highlight-color)] rounded-full"
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </div>
        );
        
      case "pulse":
      default:
        return (
          <motion.div
            animate={LOADING_VARIANTS.pulse}
            className="mb-4"
          >
            <div className={`w-12 h-12 border-2 border-[var(--highlight-color)] rounded-full ${size === 'sm' ? 'w-6 h-6' : size === 'lg' ? 'w-16 h-16' : ''}`} />
          </motion.div>
        );
    }
  };

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className="text-center">
        {renderLoadingIcon()}
        <GlowText 
          intensity="high" 
          className={sizeClasses[size]}
        >
          {text}
        </GlowText>
      </div>
    </div>
  );
};

Loading.propTypes = {
  text: PropTypes.string,
  variant: PropTypes.oneOf(['pulse', 'spin', 'dots']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  fullScreen: PropTypes.bool,
  className: PropTypes.string
};

export default memo(Loading);