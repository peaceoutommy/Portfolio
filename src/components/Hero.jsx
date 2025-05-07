import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [displayedText1, setDisplayedText1] = useState('');
  const [displayedText2, setDisplayedText2] = useState('');
  const [isTyping1, setIsTyping1] = useState(true);
  const [isTyping2, setIsTyping2] = useState(false);
  const containerRef = useRef(null);
  
  const fullText1 = "Hi, I'm Tomás Lopes";
  const fullText2 = "Software Engineer";

  // Improved typewriter effect with better timing
  useEffect(() => {
    let timer1, timer2;
    
    // Type the first text
    if (isTyping1) {
      const typingSpeed = 80; // ms per character
      
      if (displayedText1.length < fullText1.length) {
        timer1 = setTimeout(() => {
          setDisplayedText1(fullText1.substring(0, displayedText1.length + 1));
        }, typingSpeed);
      } else {
        setIsTyping1(false);
        setIsTyping2(true); // Start typing the second text
      }
    }
    
    // Type the second text
    if (isTyping2) {
      const typingSpeed = 80; // ms per character
      
      if (displayedText2.length < fullText2.length) {
        timer2 = setTimeout(() => {
          setDisplayedText2(fullText2.substring(0, displayedText2.length + 1));
        }, typingSpeed);
      } else {
        setIsTyping2(false);
      }
    }
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [displayedText1, displayedText2, isTyping1, isTyping2, fullText1, fullText2]);

  // Particles animation
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const particleCount = window.innerWidth > 768 ? 50 : 25;
    const particles = [];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('hero-particle');
      
      // Random properties
      const size = Math.random() * 4 + 1;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * 20 + 10;
      const opacity = Math.random() * 0.5 + 0.1;
      
      // Set particle styles
      Object.assign(particle.style, {
        width: `${size}px`,
        height: `${size}px`,
        left: `${posX}%`,
        top: `${posY}%`,
        opacity: opacity,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        background: 'var(--highlight-color)',
        boxShadow: '0 0 6px var(--highlight-color)',
        position: 'absolute',
        borderRadius: '50%',
        animation: 'float-particle infinite ease-in-out'
      });
      
      container.appendChild(particle);
      particles.push(particle);
    }
    
    // Cleanup
    return () => {
      particles.forEach(particle => {
        if (particle.parentNode === container) {
          container.removeChild(particle);
        }
      });
    };
  }, []);

  // Animation variants for the content
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden" id="home">
      {/* Particle container */}
      <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden">
        {/* Particles added via JS */}
      </div>
      
      {/* Grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(var(--highlight-rgb),0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 z-0"></div>
      
      {/* Glowing orb in background */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[color:var(--highlight-color)] opacity-5 blur-[100px] z-0"></div>
      
      <motion.div 
        className="relative z-10 max-w-4xl mx-auto text-center px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main heading */}
        <motion.div variants={itemVariants} className="mb-6">
          <h1 
            className={`text-4xl md:text-6xl lg:text-7xl font-bold neon-text leading-tight min-h-[1.2em] ${isTyping1 ? 'typing' : ''}`}
          >
            {displayedText1}
          </h1>
        </motion.div>
        
        {/* Subtitle/role */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2 
            className={`text-2xl md:text-4xl lg:text-5xl neon-text leading-tight min-h-[1.2em] opacity-80 ${isTyping2 ? 'typing' : ''}`}
          >
            {displayedText2}
          </h2>
        </motion.div>
        
        {/* CTA Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row gap-6 justify-center"
        >
          <motion.a 
            href="#contact" 
            className="px-8 py-4 rounded-lg border-2 border-[var(--highlight-color)] neon-text-hover transition-all duration-300 hover:bg-[var(--highlight-color)]/10 relative overflow-hidden group"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Contact Me</span>
            <span className="absolute inset-0 bg-[var(--highlight-color)]/0 group-hover:bg-[var(--highlight-color)]/10 transition-all duration-300"></span>
          </motion.a>
          
          <motion.a 
            href="#projects" 
            className="px-8 py-4 rounded-lg bg-[var(--highlight-color)]/20 border-2 border-[var(--highlight-color)] neon-text-hover transition-all duration-300 hover:bg-[var(--highlight-color)]/30 relative overflow-hidden group"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">View Projects</span>
            <span className="absolute inset-0 bg-[var(--highlight-color)]/0 group-hover:bg-[var(--highlight-color)]/10 transition-all duration-300"></span>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;