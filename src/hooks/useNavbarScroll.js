import { useState, useEffect } from 'react';

export function useNavbarScroll() {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [shouldHideHeader, setShouldHideHeader] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 100; // Only hide after scrolling 100px

      if (currentScrollY < 10) {
        setShouldHideHeader(false); // Always show at top
        setIsScrolling(false);
        return;
      }

      // Determine scroll direction with threshold
      if (currentScrollY > lastScrollY + scrollThreshold) {
        // Only hide when scrolled significantly down
        setShouldHideHeader(true);
        setIsScrolling(true);
      } else if (currentScrollY < lastScrollY - 10) {
        // Show when scrolling up just a bit
        setShouldHideHeader(false);
        setIsScrolling(true);
      }

      // Update last scroll position
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  return { shouldHideHeader, isScrolling };
}