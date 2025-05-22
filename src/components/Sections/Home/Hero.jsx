// src/components/sections/Hero.jsx
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScrollToSection } from '../../../hooks/useScrollToSection';
import Particles from '../../Particles';
import Button from '../../ui/Button';
import GlowText from '../../ui/GlowText';

const Hero = () => {
  const containerRef = useRef(null);
  const scrollToSection = useScrollToSection();
  
  // State for typewriter effect
  const [displayedName, setDisplayedName] = useState('');
  const [displayedRole, setDisplayedRole] = useState('');
  const [isTypingName, setIsTypingName] = useState(true);
  const [isTypingRole, setIsTypingRole] = useState(false);
  const [nameComplete, setNameComplete] = useState(false);
  
  // Full texts
  const fullName = "Hi, I'm Tomás Lopes";
  const fullRole = "Software Engineer";
  
  // Typewriter effect for name
  useEffect(() => {
    if (isTypingName) {
      if (displayedName.length < fullName.length) {
        const timeout = setTimeout(() => {
          setDisplayedName(fullName.substring(0, displayedName.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        setIsTypingName(false);
        setNameComplete(true);
      }
    }
  }, [displayedName, isTypingName, fullName]);
  
  // Start typing role after name is complete
  useEffect(() => {
    if (nameComplete && !isTypingRole) {
      setTimeout(() => {
        setIsTypingRole(true);
      }, 500); // Delay before starting to type role
    }
  }, [nameComplete, isTypingRole]);
  
  // Typewriter effect for role
  useEffect(() => {
    if (isTypingRole) {
      if (displayedRole.length < fullRole.length) {
        const timeout = setTimeout(() => {
          setDisplayedRole(fullRole.substring(0, displayedRole.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        setIsTypingRole(false);
      }
    }
  }, [displayedRole, isTypingRole, fullRole]);

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
        className="relative z-10 max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main heading */}
        <motion.div variants={itemVariants} className="mb-6">
          <h1 
            className={`text-3xl md:text-6xl lg:text-7xl font-bold leading-tight min-h-[1.2em] ${isTypingName ? 'typing' : ''}`}
          >
            <GlowText intensity="medium">{displayedName}</GlowText>
          </h1>
        </motion.div>
        
        {/* Subtitle/role */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2 
            className={`text-xl md:text-4xl lg:text-5xl leading-tight min-h-[1.2em] opacity-80 ${isTypingRole ? 'typing' : ''}`}
          >
            <GlowText intensity="medium">{displayedRole}</GlowText>
          </h2>
        </motion.div>
        
        {/* CTA Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row gap-6 justify-center sm:px-6"
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