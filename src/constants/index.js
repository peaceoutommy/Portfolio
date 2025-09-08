// src/constants/index.js
/**
 * Centralized constants to eliminate magic numbers and strings
 */

// Breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768, 
  LG: 1024,
  XL: 1280,
  '2XL': 1536
};

// Animation timings
export const TIMINGS = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
  EXTRA_SLOW: 800
};

// Common delays used in stagger animations
export const DELAYS = {
  STAGGER_CHILD: 0.1,
  STAGGER_CONTAINER: 0.2,
  SECTION_LOAD: 0.3,
  INTERACTION: 0.15
};

// Toast configuration
export const TOAST_CONFIG = {
  DEFAULT_DURATION: 3000,
  SUCCESS_DURATION: 4000,
  ERROR_DURATION: 5000,
  WARNING_DURATION: 4500
};

// Intersection observer thresholds
export const INTERSECTION_THRESHOLDS = {
  MINIMAL: 0.1,
  QUARTER: 0.25,
  HALF: 0.5,
  MOST: 0.75
};