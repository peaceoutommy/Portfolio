import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScrollToSection } from '../../../hooks/useScrollToSection';
import { SECTION_VARIANTS, ITEM_VARIANTS } from '../../../constants/animations';
import Particles from '../../Particles';
import Button from '../../ui/Button';
import GlowText from '../../ui/GlowText';
import { FaCode, FaTerminal, FaChevronDown } from 'react-icons/fa';
import Icons from '../../ui/Icons';

const SOCIAL_LINKS = [
  { icon: "GitHub", url: "https://github.com/peaceoutommy", label: "GitHub" },
  { icon: "LinkedIn", url: "https://www.linkedin.com/in/tomaslopess", label: "LinkedIn" },
  { icon: "Email", url: "mailto:tomas.29.work@gmail.com", label: "Email" }
];

const Hero = () => {
  const containerRef = useRef(null);
  const scrollToSection = useScrollToSection();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);


  return (
    <section
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      id="home"
      ref={containerRef}
    >
      {/* Dynamic Background */}
      <Particles />

      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(var(--highlight-rgb),0.1)_1px,transparent_1px)] bg-[size:60px_60px] opacity-50 z-0"></div>

      {/* Parallax gradient orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-[color:var(--highlight-color)] opacity-10 blur-[150px] z-0"
        style={{
          left: `${20 + mousePosition.x * 0.02}%`,
          top: `${30 + mousePosition.y * 0.02}%`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute w-80 h-80 rounded-full bg-[color:var(--highlight-color)] opacity-5 blur-[120px] z-0"
        style={{
          right: `${20 + mousePosition.x * -0.02}%`,
          bottom: `${25 + mousePosition.y * -0.02}%`,
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Main content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left side - Text content */}
        <motion.div
          className="text-center lg:text-left"
          variants={SECTION_VARIANTS.slide}
          initial="hidden"
          animate="visible"
        >

          {/* Main heading */}
          <motion.div variants={ITEM_VARIANTS.fadeInUp} className="mb-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
              <span className="block text-white">Tomás</span>
              <span className="block">
                <GlowText intensity="medium">Lopes</GlowText>
              </span>
            </h1>
          </motion.div>

          {/* Role and description */}
          <motion.div variants={ITEM_VARIANTS.fadeInUp} className="mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl mb-4">
              <GlowText intensity="low">Software Engineer</GlowText>
            </h2>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={ITEM_VARIANTS.scaleIn}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <Button
              variant="default"
              size="lg"
              onClick={() => scrollToSection('projects')}
              className="group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Projects
              </span>
            </Button>

            <Button
              variant="default"
              size="lg"
              onClick={() => scrollToSection('contact')}
              className="group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Contact Me
              </span>
            </Button>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={ITEM_VARIANTS.fadeInUp}
            className="flex gap-6 justify-center lg:justify-start"
          >
            <div className="flex gap-6 mb-6">
              {SOCIAL_LINKS.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl"
                  aria-label={link.label}
                  whileHover={{ y: -3, scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <GlowText hover intensity="medium">
                    <Icons name={link.icon} />
                  </GlowText>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right side - Visual elements */}
        <motion.div
          className="relative h-96 lg:h-[500px] flex items-center justify-center"
          variants={SECTION_VARIANTS.slide}
          initial="hidden"
          animate="visible"
        >
          {/* Central code block */}
          <motion.div
            className="relative w-80 h-80 lg:w-96 lg:h-96 border border-[var(--highlight-color)]/30 bg-black/20 backdrop-blur-md rounded-lg p-6"
            variants={ITEM_VARIANTS.scaleIn}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            transition={{ duration: 0.3 }}
          >
            {/* Code content */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-xs text-white/50 ml-4">portfolio.js</span>
              </div>

              <div className="space-y-2 text-sm font-mono">
                <div className="text-[var(--highlight-color)]">
                  <span className="text-white/50">const</span> developer = <span className="text-yellow-400">'Tomás'</span>;
                </div>
                <div className="text-[var(--highlight-color)]">
                  <span className="text-white/50">const</span> skills = [
                </div>
                <div className="text-green-400 ml-4">'React', 'Node.js', 'JavaScript', 'C#</div>
                <div className="text-[var(--highlight-color)]">];</div>
                <div className="text-white/50 mt-4">// Building amazing things</div>
                <div className="text-[var(--highlight-color)]">
                  <span className="text-white/50">function</span> "createMagic() {`{`}
                </div>
                <div className="text-yellow-400 ml-4">return</div>
                <div className="text-green-400 ml-8">'Innovation'</div>
                <div className="text-[var(--highlight-color)]">{`}`}</div>
              </div>
            </div>

            {/* Floating elements around code block */}
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 bg-[var(--highlight-color)]/20 rounded-full flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <FaCode className="text-[var(--highlight-color)]" size={16} />
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 w-8 h-8 bg-[var(--highlight-color)]/20 rounded-full flex items-center justify-center"
              animate={{ rotate: -360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <FaTerminal className="text-[var(--highlight-color)]" size={16} />
            </motion.div>
          </motion.div>

          {/* Background glow effect */}
          <div className="absolute inset-0 bg-[var(--highlight-color)]/5 rounded-lg blur-xl scale-110"></div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.button
          onClick={() => scrollToSection('projects')}
          className="flex flex-col items-center gap-2 text-[var(--highlight-color)]/60 hover:text-[var(--highlight-color)] transition-colors duration-300"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-xs font-mono">Explore</span>
          <FaChevronDown size={16} />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;