// src/components/ui/AnimatedSection.jsx - STANDARDIZED VERSION
import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';
import { SECTION_VARIANTS, INTERSECTION_CONFIG } from '../../constants/animations';

/**
 * Standardized AnimatedSection component
 * Ensures consistent scroll-based animations across all sections
 * 
 * ✅ FIXED: Consistent thresholds, timing, and animation patterns
 */
const AnimatedSection = forwardRef(({ 
  children,
  id,
  className = "",
  variant = "default",
  threshold = INTERSECTION_CONFIG.SECTION_THRESHOLD,
  triggerOnce = INTERSECTION_CONFIG.TRIGGER_ONCE,
  rootMargin = INTERSECTION_CONFIG.ROOT_MARGIN,
  ...props
}, ref) => {
  
  // ✅ STANDARDIZED: Same intersection observer config for all sections
  const { ref: inViewRef, inView } = useInView({
    threshold,
    triggerOnce,
    rootMargin
  });

  // ✅ CONSISTENT: All sections use the same animation variants
  const animationVariant = SECTION_VARIANTS[variant] || SECTION_VARIANTS.default;

  // Handle both internal ref and forwarded ref
  const setRefs = (node) => {
    inViewRef(node);
    if (ref) {
      if (typeof ref === 'function') {
        ref(node);
      } else {
        ref.current = node;
      }
    }
  };

  return (
    <motion.section
      ref={setRefs}
      id={id}
      className={`relative w-full px-4 sm:px-8 py-16 md:py-24 flex flex-col items-center ${className}`}
      variants={animationVariant}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      {...props}
    >
      {typeof children === 'function' ? children(inView) : children}
    </motion.section>
  );
});

AnimatedSection.displayName = 'AnimatedSection';

AnimatedSection.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  id: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'stagger', 'slide', 'fade']),
  threshold: PropTypes.number,
  triggerOnce: PropTypes.bool,
  rootMargin: PropTypes.string
};

export default AnimatedSection;