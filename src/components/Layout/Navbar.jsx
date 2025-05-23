import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeColorButton from '../ui/ThemeColorButton';
import NavLink from '../ui/NavLink';
import GlowText from '../ui/GlowText';
import { useScrollToSection } from '../../hooks/useScrollToSection';
import { useNavbarScroll } from '../../hooks/useNavbarScroll';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'timeline', label: 'Experience' },
  { id: 'contact', label: 'Contact' }
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // Add this to track current route

  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

  // Use our simplified navbar scroll hook
  const { isVisible, isAtTop } = useNavbarScroll();
  const scrollToSection = useScrollToSection();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  // Handle navigation
  const handleNavClick = (id) => {
    navigate('/');
    // Scroll to projects section after a short delay
    setTimeout(() => {
      const projectsSection = document.getElementById(`${id}`);
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Update active section based on scroll position - ONLY when on home page
  useEffect(() => {
    // Don't track active sections if not on home page
    if (!isHomePage) {
      setActiveSection('');
      return;
    }

    const handleScroll = () => {
      const sections = NAV_ITEMS.map(item => item.id);

      // Find the section that is currently in view
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the section is in the viewport (with some tolerance)
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }

      // If we're at the top of the page, home is active
      if (window.scrollY < 100) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]); // Add isHomePage as dependency

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

  // Close menu when navbar is hidden
  useEffect(() => {
    if (!isVisible && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isVisible, isMenuOpen]);

  return (
    <>
      {/* Desktop Header */}
      <motion.header
        className={`w-full py-4 px-4 sm:px-8 fixed top-0 z-50 
                    transition-all duration-300
                    ${isAtTop ? 'bg-black/30' : 'bg-black/70'} 
                    backdrop-blur-sm neon-border`}
        initial={{ y: 0 }}
        animate={{
          y: isVisible ? 0 : -100,
        }}
        transition={{
          type: "tween",
          duration: 0.3
        }}
      >
        <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
          {/* Logo/Brand */}
          <h1 className="text-lg md:text-xl lg:text-2xl">
            <Link to={"/"}>
              <GlowText intensity="high" className="neon-title">Portfolio</GlowText>
            </Link>
          </h1>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-6 items-center">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  active={isHomePage && activeSection === item.id} 
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

      {/* Mobile Navigation with AnimatePresence for proper animations */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            id="mobile-menu"
            className="fixed w-full top-[73px] z-40 backdrop-blur-[10px] bg-black/70 neon-border md:hidden"
            style={{
              boxShadow: 'var(--box-shadow-md)',
              // Ensure the top edge of the menu is visible by adding a border
              borderTop: '1px solid var(--highlight-color)'
            }}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="flex flex-col space-y-4 py-4 px-8">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.id}
                  href={`#${item.id}`}
                  isMobile={true}
                  active={isHomePage && activeSection === item.id}
                  onClick={() => handleNavClick(item.id)}
                >
                  {item.label}
                </NavLink>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;