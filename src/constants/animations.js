// src/constants/animations.js - ENHANCED WITH SECTION VARIANTS
/**
 * Standardized animation variants used across the application
 * ✅ ADDED: Section-level animations for consistent scroll behavior
 */

// ✅ STANDARDIZED: Intersection Observer configuration
export const INTERSECTION_CONFIG = {
  SECTION_THRESHOLD: 0.15,           // When sections start animating
  ITEM_THRESHOLD: 0.1,               // When individual items start animating  
  TRIGGER_ONCE: false,               // Allow animations to repeat
  ROOT_MARGIN: "-10% 0px -10% 0px"   // Animation trigger zone
};

// Common easing functions
export const EASINGS = {
  spring: { type: "spring", stiffness: 300, damping: 20 },
  springGentle: { type: "spring", stiffness: 200, damping: 25 },
  smooth: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  quick: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
  slow: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
};

// ✅ NEW: Standardized section-level animations
export const SECTION_VARIANTS = {
  // Default section animation - consistent for all sections
  default: {
    hidden: { 
      opacity: 0, 
      y: 30,
      transition: EASINGS.smooth
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        ...EASINGS.smooth,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  },

  // Stagger animation for sections with multiple items
  stagger: {
    hidden: { 
      opacity: 0,
      transition: EASINGS.smooth
    },
    visible: {
      opacity: 1,
      transition: {
        ...EASINGS.smooth,
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  },

  // Slide animation for hero-like sections
  slide: {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95,
      transition: EASINGS.slow
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        ...EASINGS.slow,
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  },

  // Simple fade for content-heavy sections
  fade: {
    hidden: { 
      opacity: 0,
      transition: EASINGS.smooth
    },
    visible: { 
      opacity: 1,
      transition: {
        ...EASINGS.smooth,
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  }
};

// Card hover animations - used in ProjectDetail, Skills, Timeline, etc.
export const CARD_VARIANTS = {
  hover: {
    active: {
      y: -5,
      scale: 1.02, // ✅ ENHANCED: Added subtle scale for active state
      boxShadow: "0 8px 40px rgba(var(--highlight-color-rgb), 0.3)",
      transition: EASINGS.spring
    },
    inactive: {
      y: 0,
      scale: 1,
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
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

// ✅ ENHANCED: Consistent container animations
export const CONTAINER_VARIANTS = {
  // Standard stagger for most grid layouts
  stagger: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15
      }
    }
  },
  
  // Grid layouts (projects, skills categories)
  grid: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  },

  // List layouts (timeline, features)
  list: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  }
};

// ✅ STANDARDIZED: Consistent item animations
export const ITEM_VARIANTS = {
  // Most common - fade in from bottom
  fadeInUp: {
    hidden: { 
      opacity: 0, 
      y: 20,
      transition: EASINGS.smooth
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: EASINGS.smooth
    }
  },
  
  // For cards and interactive elements
  scaleIn: {
    hidden: { 
      opacity: 0, 
      scale: 0.9,
      y: 10,
      transition: EASINGS.smooth
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: EASINGS.smooth
    }
  },

  // For side navigation or timeline items
  slideInLeft: {
    hidden: { 
      opacity: 0, 
      x: -30,
      transition: EASINGS.smooth
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: EASINGS.smooth
    }
  },

  slideInRight: {
    hidden: { 
      opacity: 0, 
      x: 30,
      transition: EASINGS.smooth
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: EASINGS.smooth
    }
  },

  // Simple fade for text content
  fadeIn: {
    hidden: { 
      opacity: 0,
      transition: EASINGS.smooth
    },
    visible: { 
      opacity: 1,
      transition: EASINGS.smooth
    }
  }
};

// Page transition animations (for route changes)
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

// ✅ OPTIMIZED: Timeline-specific animations with better performance
export const TIMELINE_VARIANTS = {
  progressBar: {
    hidden: { scaleY: 0, opacity: 0 },
    visible: { 
      scaleY: 1, 
      opacity: 1,
      transition: {
        ...EASINGS.smooth,
        transformOrigin: "top"
      }
    }
  },

  timelineItem: {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95,
      // ✅ PERFORMANCE: Ensure GPU acceleration
      willChange: "transform, opacity"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        ...EASINGS.smooth,
        // ✅ ENHANCED: Slightly longer duration for smoother timeline animations
        duration: 0.5
      },
      willChange: "auto" // Reset after animation
    },
    active: {
      scale: 1.02,
      transition: EASINGS.spring
    }
  },

  // ✅ NEW: Optimized alternating timeline animations
  timelineItemLeft: {
    hidden: { 
      opacity: 0, 
      x: -40,
      y: 20,
      scale: 0.95,
      willChange: "transform, opacity"
    },
    visible: { 
      opacity: 1, 
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        ...EASINGS.smooth,
        duration: 0.5
      },
      willChange: "auto"
    }
  },

  timelineItemRight: {
    hidden: { 
      opacity: 0, 
      x: 40,
      y: 20,
      scale: 0.95,
      willChange: "transform, opacity"
    },
    visible: { 
      opacity: 1, 
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        ...EASINGS.smooth,
        duration: 0.5
      },
      willChange: "auto"
    }
  },

  // ✅ NEW: Timeline container animation
  timelineContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Stagger timeline items
        delayChildren: 0.2,
        duration: 0.3
      }
    }
  }
};