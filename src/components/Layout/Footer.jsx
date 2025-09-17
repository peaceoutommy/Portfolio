import { memo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { INTERSECTION_THRESHOLDS } from '../../constants/index';
import { ITEM_VARIANTS } from '../../constants/animations';
import GlowText from './../ui/GlowText';
import Icons from './../ui/Icons';

const SOCIAL_LINKS = [
  { icon: "GitHub", url: "https://github.com/peaceoutommy", label: "GitHub" },
  { icon: "LinkedIn", url: "https://www.linkedin.com/in/tomaslopess", label: "LinkedIn" },
  { icon: "Email", url: "mailto:tomas.29.work@gmail.com", label: "Email" }
];

const Footer = () => {
  const { ref, inView } = useInView({
    threshold: INTERSECTION_THRESHOLDS.MINIMAL,
    triggerOnce: false,
  });

  return (
    <motion.footer
      ref={ref}
      className="w-full p-4 flex flex-col justify-center items-center neon-border md:mt-32 mt-16"
      style={{
        backgroundColor: 'var(--bg-secondary)'
      }}
      variants={ITEM_VARIANTS.fadeInUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
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

      <div className="text-center flex flex-col">
        <GlowText className="text-base">
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