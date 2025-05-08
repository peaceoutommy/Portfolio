import { memo } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import GlowText from './GlowText';

/**
 * SectionTitle - A standardized section title component with animation
 */
const SectionTitle = ({ title, inView }) => (
  <h2 className="text-3xl mb-16 sm:mb-24 text-center relative">
    <GlowText intensity="medium">{title}</GlowText>
    <motion.span 
      className="absolute w-16 h-1 bg-[var(--highlight-color)] left-1/2 -bottom-4 transform -translate-x-1/2"
      initial={{ width: 0 }}
      animate={{ width: inView ? '4rem' : 0 }}
      transition={{ 
        delay: 0.3, 
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }}
      style={{
        boxShadow: '0 0 8px var(--highlight-color)'
      }}
    />
  </h2>
);

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  inView: PropTypes.bool
};

export default memo(SectionTitle);