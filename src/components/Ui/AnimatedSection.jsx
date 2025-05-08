// src/components/ui/AnimatedSection.jsx
import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';

/**
 * AnimatedSection - A standardized section component with consistent animation and spacing
 */
const AnimatedSection = forwardRef(({ 
  children,
  id,
  className = '',
  threshold = 0.1,
  triggerOnce = false,
  delay = 0,
  ...props
}, ref) => {
  const { ref: inViewRef, inView } = useInView({
    threshold,
    triggerOnce,
  });
  
  // Merge refs
  const setRefs = (node) => {
    // Ref from forwardRef
    if (ref) {
      if (typeof ref === 'function') {
        ref(node);
      } else {
        ref.current = node;
      }
    }
    // Ref from useInView
    inViewRef(node);
  };
  
  return (
    <motion.section
      ref={setRefs}
      id={id}
      className={`w-full md:mt-48 mt-32 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ duration: 0.3, delay }}
      {...props}
    >
      {typeof children === 'function' ? children(inView) : children}
    </motion.section>
  );
});

AnimatedSection.displayName = 'AnimatedSection';

AnimatedSection.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func
  ]).isRequired,
  id: PropTypes.string,
  className: PropTypes.string,
  threshold: PropTypes.number,
  triggerOnce: PropTypes.bool,
  delay: PropTypes.number,
};

export default AnimatedSection;