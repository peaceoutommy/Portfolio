import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import GlowContainer from './GlowContainer';

/**
 * Card - A wrapper around GlowContainer with card-specific defaults
 */
const Card = forwardRef(({ 
  children, 
  className = '', 
  onClick, 
  whileHover = { y: -5 },
  isActive = false,
  intensity = 'medium',
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
  intensity: PropTypes.oneOf(['low', 'medium', 'high'])
};

export default Card;