const NavLink = ({ href, children, onClick }) => (
  <li>
    <a
      className="neon-text-hover text-sm md:text-base lg:text-lg"
      href={href}
      onClick={onClick}
    >
      {children}
    </a>
  </li>
);

export default NavLink;