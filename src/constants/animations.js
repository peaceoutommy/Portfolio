// src/constants/animations.js
/**
 * Standardized animation variants used across the application
 * Eliminates duplicate animation definitions and ensures consistency
 */

// Common easing functions
export const EASINGS = {
  spring: { type: "spring", stiffness: 300, damping: 20 },
  springGentle: { type: "spring", stiffness: 200, damping: 25 },
  smooth: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  quick: { duration: 0.15 },
  slow: { duration: 0.5 }
};

// Card hover animations - used in ProjectDetail, Skills, Timeline, etc.
export const CARD_VARIANTS = {
  hover: {
    active: {
      y: -5,
      transition: EASINGS.spring
    },
    inactive: {
      y: 0,
      transition: EASINGS.springGentle
    }
  },
  
  // Scale variant for buttons and interactive elements
  scale: {
    rest: { scale: 1 },
    hover: { 
      scale: 1.03,
      transition: EASINGS.quick
    },
    tap: {
      scale: 0.98,
      transition: EASINGS.quick
    }
  }
};

// Container animations for multiple items
export const CONTAINER_VARIANTS = {
  // Stagger children animations
  stagger: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },
  
  // Grid animations
  grid: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }
};

// Item animations for individual elements
export const ITEM_VARIANTS = {
  // Fade in from bottom (most common)
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: EASINGS.smooth
    }
  },
  
  // Fade in from sides
  fadeInLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: EASINGS.smooth
    }
  },
  
  fadeInRight: {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: EASINGS.smooth
    }
  },
  
  // Scale in animation
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: EASINGS.smooth
    }
  }
};

// Page transition animations
export const PAGE_VARIANTS = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: EASINGS.smooth
};

// Loading animations
export const LOADING_VARIANTS = {
  pulse: {
    scale: [0.9, 1.1, 0.9],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  
  spin: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
};