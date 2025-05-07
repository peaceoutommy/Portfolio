import { memo } from 'react';
import PropTypes from 'prop-types';

const NavLink = ({ href, children, onClick, isMobile = false }) => (
  <li>
    <a
      className={`neon-text-hover ${isMobile ? 'text-base' : 'text-sm md:text-base lg:text-lg'}`}
      href={href}
      onClick={onClick}
    >
      {children}
    </a>
  </li>
);

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  isMobile: PropTypes.bool
};

export default memo(NavLink);
