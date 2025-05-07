import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ScrollAnimation = ({ children }) => {
  const ref = useRef(null);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          entry.target.classList.remove('hidden');
        } else {
          entry.target.classList.add('hidden');
          entry.target.classList.remove('visible');
        }
      });
    }, { threshold: 0.1 });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={ref.current?.classList.contains('visible') ? 'visible' : 'hidden'}
      exit="exit"
      variants={variants}
      transition={{ duration: 0.3 }}
      style={{ position: 'absolute', width: '100%' }} // Use absolute positioning
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimation;