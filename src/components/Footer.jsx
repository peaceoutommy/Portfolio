// src/components/Footer.jsx
import { memo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SOCIAL_LINKS = [
  { icon: "fab fa-github", url: "https://github.com/peaceoutommy", label: "GitHub" },
  { icon: "fab fa-linkedin", url: "https://www.linkedin.com/in/tomaslopess", label: "LinkedIn" },
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
            className="neon-text-hover text-2xl"
            aria-label={link.label}
            whileHover={{ y: -3, scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <i className={link.icon} aria-hidden="true"></i>
          </motion.a>
        ))}
      </div>
      
      <div className="text-center">
        <p className="neon-text md:text-sm text-xs">© {new Date().getFullYear()} Tomás Lopes. </p>
        <p className="neon-text mt-2 md:text-xs text-[10px] opacity-70">
        All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default memo(Footer);