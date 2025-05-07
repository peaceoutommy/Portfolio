import { memo } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const SectionTitle = ({ title, inView }) => (
  <h2 className="text-3xl neon-text mb-16 sm:mb-24 text-center relative">
    <span className="z-10">{title}</span>
    <motion.span 
      className="absolute w-16 h-1 bg-[var(--highlight-color)] left-1/2 -bottom-4 transform -translate-x-1/2"
      initial={{ width: 0 }}
      animate={{ width: inView ? '4rem' : 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    />
  </h2>
);

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  inView: PropTypes.bool
};

export default memo(SectionTitle);