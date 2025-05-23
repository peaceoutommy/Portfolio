// src/components/ui/ScrollAnimation.jsx - PROPER IMPLEMENTATION
import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';
import { ITEM_VARIANTS } from '../../constants/animations';
import { INTERSECTION_THRESHOLDS } from '../../constants';

const ScrollAnimation = forwardRef(({ 
  children, 
  threshold = INTERSECTION_THRESHOLDS.MINIMAL,
  triggerOnce = false,
  variants,
  className = "",
  ...props 
}, ref) => {
  const { ref: inViewRef, inView } = useInView({
    threshold,
    triggerOnce,
  });

  // Default animation variants
  const animationVariants = variants || ITEM_VARIANTS.fadeInUp;

  return (
    <motion.div
      ref={(node) => {
        inViewRef(node);
        if (ref) {
          if (typeof ref === 'function') {
            ref(node);
          } else {
            ref.current = node;
          }
        }
      }}
      className={className}
      variants={animationVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
});

ScrollAnimation.displayName = 'ScrollAnimation';

ScrollAnimation.propTypes = {
  children: PropTypes.node.isRequired,
  threshold: PropTypes.number,
  triggerOnce: PropTypes.bool,
  variants: PropTypes.object,
  className: PropTypes.string
};

export default ScrollAnimation;