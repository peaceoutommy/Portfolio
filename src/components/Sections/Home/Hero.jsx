// src/components/sections/Hero.jsx - STANDARDIZED ANIMATIONS
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useScrollToSection } from '../../../hooks/useScrollToSection';
import { useTypewriter } from '../../../hooks/useTypewriter';
import { SECTION_VARIANTS, ITEM_VARIANTS } from '../../../constants/animations';
import Particles from '../../Particles';
import Button from '../../ui/Button';
import GlowText from '../../ui/GlowText';
import AnimatedSection from '../../ui/AnimatedSection';

const Hero = () => {
  const containerRef = useRef(null);
  const scrollToSection = useScrollToSection();
  
  // Typewriter effects
  const nameTypewriter = useTypewriter("Hi, I'm Tomás Lopes", { 
    typingSpeed: 100,
    startDelay: 200
  });
  
  const roleTypewriter = useTypewriter("Software Engineer", { 
    typingSpeed: 100,
    startTyping: nameTypewriter.isComplete,
    startDelay: 500
  });

  return (
    <section 
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden" 
      id="home"
      ref={containerRef}
    >
      {/* Background elements */}
      <Particles />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(var(--highlight-rgb),0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 z-0"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[color:var(--highlight-color)] opacity-5 blur-[100px] z-0"></div>
      
      {/* ✅ STANDARDIZED: Use consistent section animation */}
      <motion.div 
        className="relative z-10 max-w-4xl mx-auto text-center"
        variants={SECTION_VARIANTS.slide}
        initial="hidden"
        animate="visible"
      >
        {/* ✅ CONSISTENT: All items use same animation variant */}
        <motion.div variants={ITEM_VARIANTS.fadeInUp} className="mb-6">
          <h1 
            className={`text-3xl md:text-6xl lg:text-7xl font-bold leading-tight min-h-[1.2em] ${nameTypewriter.isTyping ? 'typing' : ''}`}
          >
            <GlowText intensity="medium">{nameTypewriter.displayedText}</GlowText>
          </h1>
        </motion.div>
        
        <motion.div variants={ITEM_VARIANTS.fadeInUp} className="mb-12">
          <h2 
            className={`text-xl md:text-4xl lg:text-5xl leading-tight min-h-[1.2em] opacity-80 ${roleTypewriter.isTyping ? 'typing' : ''}`}
          >
            <GlowText intensity="medium">{roleTypewriter.displayedText}</GlowText>
          </h2>
        </motion.div>
        
        {/* CTA Buttons - Only show after both typewriter effects complete */}
        {nameTypewriter.isComplete && roleTypewriter.isComplete && (
          <motion.div 
            variants={ITEM_VARIANTS.scaleIn}
            className="flex flex-col md:flex-row gap-6 justify-center sm:px-6"
          >
            <Button variant="outline" onClick={() => scrollToSection('contact')}>
              Contact Me
            </Button>
            
            <Button variant="primary" onClick={() => scrollToSection('projects')}>
              View Projects
            </Button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default Hero;