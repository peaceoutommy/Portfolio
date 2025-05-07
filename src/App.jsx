import { useState, useEffect, useCallback } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Hero from './components/Hero';
import Contact from './components/Contact';
import Tokenomics from './components/Tokenomics';

const App = () => {
  const [uiState, setUiState] = useState({
    isScrolling: false,
    numOfBalls: window.innerWidth >= 768 ? 15 : 5
  });

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setUiState((prev) => ({
        ...prev,
        isScrolling: window.scrollY > 50,
      }));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Create and manage background neon effect
  useEffect(() => {
    // Create container for background effects
    const neonBackground = document.createElement('div');
    neonBackground.classList.add('neon-background');
    document.body.appendChild(neonBackground);

    // Create a single neon ball element
    const createBall = () => {
      const ball = document.createElement('div');
      ball.classList.add('neon-blur');
      const size = `${Math.random() * 200 + 100}px`;

      Object.assign(ball.style, {
        width: size,
        height: size,
        top: `${Math.random() * 90 + 10}%`,
        left: `${Math.random() * 100}%`,
        '--animation-delay': `${Math.random() * -15}s`,
        opacity: '0'
      });

      return ball;
    };

    // Generate initial set of balls
    const balls = Array.from({ length: uiState.numOfBalls }, createBall);
    let currentIndex = 0;

    // Add balls sequentially with animation
    const addNextBall = () => {
      if (currentIndex < balls.length) {
        const ball = balls[currentIndex];
        neonBackground.appendChild(ball);
        // Use requestAnimationFrame for smoother animations
        requestAnimationFrame(() => ball.style.opacity = '1');
        currentIndex++;
        setTimeout(addNextBall, 200);
      }
    };

    addNextBall();

    // Periodically replace balls for continuous animation effect
    const interval = setInterval(() => {
      if (balls.length === 0) return;

      const randomIndex = Math.floor(Math.random() * balls.length);
      const oldBall = balls[randomIndex];
      const newBall = createBall();

      oldBall.style.opacity = '0';

      setTimeout(() => {
        if (oldBall.parentNode === neonBackground) {
          neonBackground.replaceChild(newBall, oldBall);
          balls[randomIndex] = newBall;
          requestAnimationFrame(() => newBall.style.opacity = '1');
        }
      }, 2000);
    }, 10000);

    // Clean up on component unmount
    return () => {
      clearInterval(interval);
      balls.forEach(ball => {
        if (ball && ball.parentNode === neonBackground) {
          neonBackground.removeChild(ball);
        }
      });
      if (neonBackground.parentNode) {
        document.body.removeChild(neonBackground);
      }
    };
  }, [uiState.numOfBalls]);

  // Toggle mobile menu state handler
  const handleMenuToggle = useCallback(() => {
    setUiState(prev => ({
      ...prev,
      showMobileMenu: !prev.showMobileMenu
    }));
  }, []);

  return (
    <div className="text-white min-h-screen flex flex-col">
      <Navbar
        isScrolling={uiState.isScrolling}
        showMobileMenu={uiState.showMobileMenu}
        handleMenuToggle={handleMenuToggle}
      />

      <main className="flex-grow flex flex-col items-center md:mt-16 mt-32 px-8 sm:px-16 md:px-32 ">
        <Hero />
        <Skills />
        <Projects />
        <Timeline />
        <Contact />
        <Tokenomics />
      </main>

      <Footer />
    </div>
  );
};

export default App;