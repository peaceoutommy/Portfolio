import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Toast notification component with cyberpunk styling using Tailwind
 */
const Toast = ({ 
  id,
  type = 'success', 
  message, 
  position = 'bottom-right', 
  duration = 5000, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  // Icons for different toast types
  const icons = {
    success: 'fa-check-circle',
    error: 'fa-exclamation-triangle',
    warning: 'fa-exclamation-circle',
    info: 'fa-info-circle'
  };
  
  // Colors and styling for different toast types
  const toastStyles = {
    success: {
      icon: 'text-green-500',
      border: 'border-l-4 border-l-green-500',
      progress: 'bg-green-500',
      shadow: 'shadow-[0_0_10px_rgba(34,197,94,0.5),0_0_20px_rgba(var(--highlight-rgb),0.5)]'
    },
    error: {
      icon: 'text-red-500',
      border: 'border-l-4 border-l-red-500',
      progress: 'bg-red-500',
      shadow: 'shadow-[0_0_10px_rgba(239,68,68,0.5),0_0_20px_rgba(var(--highlight-rgb),0.5)]'
    },
    warning: {
      icon: 'text-yellow-500',
      border: 'border-l-4 border-l-yellow-500',
      progress: 'bg-yellow-500',
      shadow: 'shadow-[0_0_10px_rgba(234,179,8,0.5),0_0_20px_rgba(var(--highlight-rgb),0.5)]'
    },
    info: {
      icon: 'text-blue-500',
      border: 'border-l-4 border-l-blue-500',
      progress: 'bg-blue-500',
      shadow: 'shadow-[0_0_10px_rgba(59,130,246,0.5),0_0_20px_rgba(var(--highlight-rgb),0.5)]'
    }
  };

  useEffect(() => {
    // Auto dismiss after duration
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  // Handle animation complete (after exit)
  const handleAnimationComplete = () => {
    if (!isVisible) {
      onClose(id);
    }
  };

  // Position classes mapping
  const positionClasses = {
    'top-left': 'left-4 top-16',
    'top-right': 'right-4 top-16',
    'bottom-left': 'left-4 bottom-4',
    'bottom-right': 'right-4 bottom-4',
    'top-center': 'top-16 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2'
  };

  // Entry animation direction based on position
  const getAnimationProps = () => {
    if (position.includes('left')) {
      return { 
        initial: { x: -100, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: -100, opacity: 0 }
      };
    } else if (position.includes('right')) {
      return { 
        initial: { x: 100, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: 100, opacity: 0 }
      };
    } else if (position.includes('top')) {
      return { 
        initial: { y: -100, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: -100, opacity: 0 }
      };
    } else {
      return { 
        initial: { y: 100, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: 100, opacity: 0 }
      };
    }
  };

  return (
    <AnimatePresence onExitComplete={handleAnimationComplete}>
      {isVisible && (
        <motion.div
          role="alert"
          aria-live="assertive"
          className={`fixed z-50 ${positionClasses[position]}`}
          {...getAnimationProps()}
          transition={{ 
            type: "spring", 
            damping: 20, 
            stiffness: 300 
          }}
        >
          <div 
            className={`glass rounded-lg overflow-hidden backdrop-blur-md max-w-md 
              transform transition-all duration-300 hover:scale-[1.02] 
              ${toastStyles[type].border} ${toastStyles[type].shadow}
              relative overflow-hidden`}
          >
            {/* Glitch effect with Tailwind */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              <div 
                className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"
                style={{ animation: 'toast-glitch-animation 2s infinite' }}
              ></div>
            </div>
            
            {/* Progress bar for auto dismiss */}
            <div className="h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent relative z-10">
              <div 
                className={`h-full ${toastStyles[type].progress}`}
                style={{ 
                  width: '100%',
                  animation: `shrink-width ${duration}ms linear forwards`
                }}
              />
            </div>
            
            <div className="flex items-start p-4 space-x-4 relative z-10">
              {/* Icon based on toast type */}
              <div className="flex-shrink-0 pt-0.5">
                <i className={`fas ${icons[type]} text-2xl ${toastStyles[type].icon}`}></i>
              </div>
              
              {/* Message */}
              <div className="flex-1 ml-2">
                <p className="text-white text-sm leading-5 font-mono">
                  {message}
                </p>
              </div>
              
              {/* Close button */}
              <button
                onClick={() => setIsVisible(false)}
                className="flex-shrink-0 ml-4 text-white/70 hover:text-white transition-colors duration-300 focus:outline-none"
                aria-label="Close"
              >
                <i className="fas fa-times text-sm"></i>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Toast.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  message: PropTypes.string.isRequired,
  position: PropTypes.oneOf([
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
    'top-center',
    'bottom-center'
  ]),
  duration: PropTypes.number,
  onClose: PropTypes.func.isRequired
};

export default Toast;