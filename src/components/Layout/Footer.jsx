// src/components/Footer.jsx
import { memo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import GlowText from './../ui/GlowText';

const SOCIAL_LINKS = [
  { icon: "fab fa-github", url: "https://github.com/peaceoutommy", label: "GitHub" },
  { icon: "fab fa-linkedin", url: "https://www.linkedin.com/in/tomaslopess", label: "LinkedIn" },
  { icon: "far fa-envelope", url: "mailto:tomas.29.work@gmail.com", label: "Email" }
];

const Footer = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  return (
    <motion.footer
      ref={ref}
      className="w-full p-4 flex flex-col justify-center items-center neon-border md:mt-32 mt-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ duration: 0.3 }}
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
              <i className={link.icon} aria-hidden="true"></i>
            </GlowText>
          </motion.a>
        ))}
      </div>

      <div className="text-center flex flex-col">
        <GlowText className="md:text-sm text-xs">
          © {new Date().getFullYear()} Tomás Lopes
        </GlowText>
        <GlowText className="mt-2 md:text-xs text-[10px] opacity-70" intensity="low">
          All rights reserved
        </GlowText>
      </div>
    </motion.footer>
  );
};

export default memo(Footer);