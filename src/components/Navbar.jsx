import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import ThemeColorButton from './ui/ThemeColorButton';
import NavLink from './ui/NavLink';
import { useScrollToSection } from '../hooks/useScrollToSection';
import { useNavbarScroll } from '../hooks/useNavbarScroll';

const NAV_ITEMS = [
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'timeline', label: 'Experience' },
  { id: 'contact', label: 'Contact' }
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { shouldHideHeader } = useNavbarScroll();
  const scrollToSection = useScrollToSection();
  
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  // Handle navigation
  const handleNavClick = useCallback((id) => {
    scrollToSection(id, { 
      onComplete: () => {
        // Close mobile menu after scrolling completes
        if (isMenuOpen) {
          setTimeout(() => setIsMenuOpen(false), 300);
        }
      }
    });
  }, [isMenuOpen, scrollToSection]);

  // Close menu on window resize (when switching to desktop view)
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

  // Close menu on click outside
  useEffect(() => {
    if (!isMenuOpen) return;
    
    const handleClickOutside = (e) => {
      // Only close if clicking outside of mobile menu and toggle button
      if (!e.target.closest('#mobile-menu') && !e.target.closest('#menu-toggle')) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <>
      {/* Desktop Header */}
      <motion.header
        className="w-full py-4 px-4 sm:px-8 fixed top-0 z-50 bg-black/50 backdrop-blur-sm neon-border"
        initial={{ y: 0, opacity: 1 }}
        animate={{ 
          y: shouldHideHeader ? -100 : 0, 
          opacity: shouldHideHeader ? 0 : 1 
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
          {/* Logo/Brand */}
          <h1 className="text-lg md:text-xl lg:text-2xl neon-title">Portfolio</h1>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-6 items-center">
              {NAV_ITEMS.map((item) => (
                <NavLink 
                  key={item.id} 
                  href={`#${item.id}`} 
                  onClick={() => handleNavClick(item.id)}
                >
                  {item.label}
                </NavLink>
              ))}
            </ul>
            
            <ThemeColorButton />
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <ThemeColorButton />
            
            <button
              id="menu-toggle"
              onClick={toggleMenu}
              className="ml-4 p-2 focus:outline-none"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <motion.div
                animate={isMenuOpen ? "open" : "closed"}
                className="w-6 h-6 flex flex-col justify-around"
              >
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 8 }
                  }}
                  className="w-6 h-0.5 bg-[var(--highlight-color)] block origin-center"
                />
                <motion.span
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                  }}
                  className="w-6 h-0.5 bg-[var(--highlight-color)] block"
                />
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -8 }
                  }}
                  className="w-6 h-0.5 bg-[var(--highlight-color)] block origin-center"
                />
              </motion.div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation */}
      <motion.nav
        id="mobile-menu"
        className="fixed w-full top-16 z-40 backdrop-blur-[10px] bg-black/70 neon-border md:hidden"
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isMenuOpen && !shouldHideHeader ? 0 : -100,
          opacity: isMenuOpen && !shouldHideHeader ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        style={{ boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)' }}
      >
        <ul className="flex flex-col space-y-4 py-4 px-8">
          {NAV_ITEMS.map((item) => (
            <NavLink 
              key={item.id} 
              href={`#${item.id}`}
              isMobile={true}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </NavLink>
          ))}
        </ul>
      </motion.nav>
    </>
  );
};

export default Navbar;