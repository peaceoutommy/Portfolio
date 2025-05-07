// src/components/sections/Hero.jsx
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScrollToSection } from '../../hooks/useScrollToSection';
import { useTypewriter } from '../../hooks/useTypewriter';
import Particles from '../Particles';
import Button from '../ui/Button';

const Hero = () => {
  const containerRef = useRef(null);
  const scrollToSection = useScrollToSection();
  
  // State to control when to start second typewriter
  const [shouldStartRole, setShouldStartRole] = useState(false);
  
  // Setup typewriter effects
  const { 
    displayedText: name, 
    isTyping: isTypingName, 
    isComplete: nameComplete 
  } = useTypewriter("Hi, I'm Tomás Lopes", {
    onComplete: () => setShouldStartRole(true)
  });
  
  // This effect will run whenever nameComplete changes
  useEffect(() => {
    if (nameComplete) {
      console.log("Name typing complete, starting role typing");
      setShouldStartRole(true);
    }
  }, [nameComplete]);
  
  const { 
    displayedText: role, 
    isTyping: isTypingRole 
  } = useTypewriter("Software Engineer", { 
    startTyping: shouldStartRole 
  });

  // Animation variants for content
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
    <section 
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden" 
      id="home"
      ref={containerRef}
    >
      {/* Particle container */}
      <Particles />
      
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
            className={`text-3xl md:text-6xl lg:text-7xl font-bold neon-text leading-tight min-h-[1.2em] ${isTypingName ? 'typing' : ''}`}
          >
            {name}
          </h1>
        </motion.div>
        
        {/* Subtitle/role */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2 
            className={`text-xl md:text-4xl lg:text-5xl neon-text leading-tight min-h-[1.2em] opacity-80 ${isTypingRole ? 'typing' : ''}`}
          >
            {role}
          </h2>
        </motion.div>
        
        {/* CTA Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row gap-6 justify-center"
        >
          <Button onClick={() => scrollToSection('contact')}>
            Contact Me
          </Button>
          
          <Button primary onClick={() => scrollToSection('projects')}>
            View Projects
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;