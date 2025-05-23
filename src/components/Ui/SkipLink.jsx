// src/components/ui/SkipLink.jsx
import { motion } from 'framer-motion';
import GlowText from './GlowText';

/**
 * Skip link for keyboard navigation accessibility
 * Allows users to skip directly to main content
 */
const SkipLink = ({ href = "#main-content", children = "Skip to main content" }) => {
  return (
    <motion.a
      href={href}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[9999] px-4 py-2 rounded-lg border-2 border-[var(--highlight-color)] bg-black"
      whileFocus={{ scale: 1.05 }}
      style={{
        textShadow: 'var(--text-shadow-md)',
        boxShadow: 'var(--box-shadow-md)'
      }}
    >
      <GlowText intensity="medium">{children}</GlowText>
    </motion.a>
  );
};

export default SkipLink;