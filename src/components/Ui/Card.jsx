// src/components/ui/Card.jsx
import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import GlowContainer from './GlowContainer';

/**
 * Card - A wrapper around GlowContainer with card-specific defaults
 * Updated with smooth transitions
 */
const Card = forwardRef(({ 
  children, 
  className = '', 
  onClick, 
  whileHover = { y: -5, intensity:'medium'},
  isActive = false,
  intensity,
  style,
  ...props 
}, ref) => {
  return (
    <GlowContainer
      ref={ref}
      className={className}
      whileHover={whileHover}
      onClick={onClick}
      isActive={isActive}
      intensity={intensity}
      style={style}
      {...props}
    >
      {children}
    </GlowContainer>
  );
});

Card.displayName = 'Card';

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  whileHover: PropTypes.object,
  isActive: PropTypes.bool,
  intensity: PropTypes.oneOf(['none', 'low', 'medium', 'high']),
  style: PropTypes.object
};

export default Card;