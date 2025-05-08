// src/components/ui/NavLink.jsx
import { memo } from 'react';
import PropTypes from 'prop-types';
import GlowText from './GlowText';

/**
 * NavLink - A standardized navigation link component
 */
const NavLink = ({ href, children, onClick, isMobile = false, active = false }) => (
  <li>
    <a
      className={`transition-all duration-300 ${isMobile ? 'text-base' : 'text-sm sm:text-base lg:text-lg'} ${active ? 'font-bold' : ''}`}
      href={href}
      onClick={onClick}
    >
      <GlowText hover intensity={active ? 'high' : 'medium'}>
        {children}
      </GlowText>
    </a>
  </li>
);

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  isMobile: PropTypes.bool,
  active: PropTypes.bool
};

export default memo(NavLink);