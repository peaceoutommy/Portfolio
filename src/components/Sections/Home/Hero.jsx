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
      className="relative min-h-screen w-full flex items-center justify-center mt-32 lg:mt-0"
      id="home"
      ref={containerRef}
    >
      {/* Dynamic Background */}
      <Particles />

      {/* Parallax gradient orbs */}
      <motion.div
        className="absolute w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-[color:var(--highlight-color)] opacity-10 blur-[100px] sm:blur-[120px] lg:blur-[150px] z-0"
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
        className="absolute w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full bg-[color:var(--highlight-color)] opacity-5 blur-[80px] sm:blur-[100px] lg:blur-[120px] z-0"
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
      <div className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Left side - Text content */}
          <motion.div
            className="text-center lg:text-left"
            variants={SECTION_VARIANTS.slide}
            initial="hidden"
            animate="visible"
          >

            {/* Main heading */}
            <motion.div variants={ITEM_VARIANTS.fadeInUp} className="mb-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
                <span className="block text-white">Tomás</span>
                <span className="block">
                  <GlowText intensity="medium">Lopes</GlowText>
                </span>
              </h1>
            </motion.div>

            {/* Role and description */}
            <motion.div variants={ITEM_VARIANTS.fadeInUp} className="mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4">
                <GlowText intensity="medium">Software Engineer</GlowText>
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
                Projects
              </Button>

              <Button
                variant="default"
                size="lg"
                onClick={() => scrollToSection('contact')}
                className="group relative overflow-hidden"
              >
                Contact Me
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
            className="relative flex items-center justify-center mt-8 lg:mt-0"
            variants={SECTION_VARIANTS.slide}
            initial="hidden"
            animate="visible"
          >
            {/* Central code block */}
            <motion.div
              className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg border border-white/20 hover:border-white/30 bg-black/20 backdrop-blur-md rounded-lg p-4 sm:p-6"
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

                <div className="space-y-2 text-xs sm:text-sm font-mono">
                  <div className="text-[var(--highlight-color)]">
                    <span className="text-white/50">const</span> developer = <span className="text-yellow-400">'Tomás'</span>;
                  </div>
                  <div className="text-[var(--highlight-color)]">
                    <span className="text-white/50">const</span> skills = [
                  </div>
                  <div className="text-green-400 ml-4">'React', 'Node.js', 'JavaScript',</div>
                  <div className="text-green-400 ml-4">'C#', '.NET', 'Python',</div>
                  <div className="text-green-400 ml-4">'Express', 'Blazor'</div>
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
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;