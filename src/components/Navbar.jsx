import { useState, useEffect, useCallback } from 'react';

// Navigation link component
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

// Theme color selection button
const ColorButton = ({ highlightColor, onColorChange }) => {
  const colors = ['#ff00ff', '#ffffff', '#00ffff', '#ff0000', '#00ff00'];

  const handleColorClick = useCallback(() => {
    const currentIndex = colors.indexOf(highlightColor);
    const nextIndex = (currentIndex + 1) % colors.length;
    onColorChange(colors[nextIndex]);
  }, [colors, highlightColor, onColorChange]);

  return (
    <li className="flex items-center gap-2">
      <button
        onClick={handleColorClick}
        className="w-6 h-6 rounded border border-white glass transition-all duration-300"
        style={{ backgroundColor: highlightColor }}
        title="Click to change theme color"
        aria-label="Change theme color"
      />
    </li>
  );
};

const Navbar = ({ isScrolling, handleMenuToggle }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [highlightColor, setHighlightColor] = useState('#ff00ff');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [shouldHideHeader, setShouldHideHeader] = useState(false);

  // Load saved theme color from localStorage
  useEffect(() => {
    const storedColor = localStorage.getItem('highlightColor');
    if (storedColor) {
      setHighlightColor(storedColor);
    }
  }, []);

  // Handle color change
  const handleColorChange = useCallback((newColor) => {
    setHighlightColor(newColor);
    localStorage.setItem('highlightColor', newColor);
  }, []);

  // Update CSS variable for highlight color
  useEffect(() => {
    document.documentElement.style.setProperty('--highlight-color', highlightColor);
    
    // Extract RGB values for other CSS variables
    const r = parseInt(highlightColor.slice(1, 3), 16);
    const g = parseInt(highlightColor.slice(3, 5), 16);
    const b = parseInt(highlightColor.slice(5, 7), 16);
    document.documentElement.style.setProperty('--highlight-rgb', `${r}, ${g}, ${b}`);
  }, [highlightColor]);

  // Toggle mobile menu
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
    handleMenuToggle();
  }, [handleMenuToggle]);

  // Improved scroll behavior to show navbar when scrolling up
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 10) {
        setShouldHideHeader(false); // Always show at top
        return;
      }
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setShouldHideHeader(true);
      } else {
        // Scrolling up
        setShouldHideHeader(false);
      }
      
      // Update last scroll position
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  // Smooth scroll to section
  const scrollToSection = useCallback((id) => {
    const section = document.getElementById(id);
    if (section) {
      const offset = 40;
      const elementPosition = section.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Close mobile menu after navigation
      if (isMenuOpen) {
        toggleMenu();
      }
    }
  }, [isMenuOpen, toggleMenu]);

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768;
      if (!isMobileView && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`w-full py-4 px-8 fixed top-0 z-50 bg-black/50 backdrop-blur-sm neon-border transition-all duration-300 ease-out transform origin-top ${
          shouldHideHeader ? 'scale-y-0 opacity-0' : 'scale-y-100 opacity-100'
        }`}
      >
        <div className="flex justify-between items-center w-full">
          <h1 className="text-lg md:text-xl lg:text-2xl neon-title">Dev Portfolio</h1>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <ul className="flex space-x-2 sm:space-x-4 items-center">
              <NavLink href="#" onClick={() => scrollToSection('skills')}>Skills</NavLink>
              <NavLink href="#" onClick={() => scrollToSection('projects')}>Projects</NavLink>
              <NavLink href="#" onClick={() => scrollToSection('timeline')}>Experience</NavLink>
              <NavLink href="#" onClick={() => scrollToSection('contact')}>Contact</NavLink>
              <ColorButton highlightColor={highlightColor} onColorChange={handleColorChange} />
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <div className='md:hidden flex gap-4'>
            <ColorButton highlightColor={highlightColor} onColorChange={handleColorChange} />
            <button 
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <i className="fas fa-times text-2xl neon-text-hover"></i>
              ) : (
                <i className="fas fa-bars text-2xl neon-text-hover"></i>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav
        className={`fixed w-full top-16 z-40 backdrop-blur-[10px] bg-black/70 neon-border transform transition-all duration-300 ease-in-out ${
          isMenuOpen && !shouldHideHeader ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
        style={{ boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)' }}
      >
        <ul className="flex flex-col space-y-4 py-4 px-8">
          <NavLink href="#" onClick={() => scrollToSection('skills')}>Skills</NavLink>
          <NavLink href="#" onClick={() => scrollToSection('projects')}>Projects</NavLink>
          <NavLink href="#" onClick={() => scrollToSection('timeline')}>Experience</NavLink>
          <NavLink href="#" onClick={() => scrollToSection('contact')}>Contact</NavLink>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;