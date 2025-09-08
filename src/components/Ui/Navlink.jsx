// src/components/ui/NavLink.jsx
import { memo } from 'react';
import PropTypes from 'prop-types';
import GlowText from './GlowText';


/**
 * NavLink - A standardized navigation link component
 */
const NavLink = ({ href, children, onClick, isMobile = false, active = false }) => (
  <li>
    <div
      className={`transition-all duration-200 cursor-pointer text-base ${active ? 'font-bold' : ''}`}
      to={`/${href}`}
      onClick={onClick}
    >
      <GlowText hover intensity={active ? 'high' : 'medium'}>
        {children}
      </GlowText>
    </div>
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