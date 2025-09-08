// src/components/ui/SkillBar.jsx
import { memo } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import GlowText from './GlowText';
import Icons from './Icons';

/**
 * SkillBar - A standardized skill bar component with animation
 */
const SkillBar = ({ skill, index, isHighlighted = false }) => {
  return (
    <motion.div
      className="w-full"
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            delay: index * 0.1
          }
        }
      }}
    >
      <div className="flex justify-between mb-2">
        <div className="flex items-center gap-2">
          <GlowText intensity={isHighlighted ? "low" : "none"} className="text-base flex items-center">
            <Icons name={skill.name} />
          </GlowText>

          <GlowText intensity={isHighlighted ? "low" : "none"}>{skill.name}</GlowText>
        </div>

      </div>
      <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/20">
        <motion.div
          className="h-full rounded-full relative"
          style={{
            background: `linear-gradient(90deg, rgba(var(--highlight-rgb), 0.7) 0%, rgba(255, 255, 255, 0.8) 100%)`,
            boxShadow: 'var(--box-shadow-sm)'
          }}
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{
            duration: 1.5,
            delay: index * 0.1,
            ease: [0.4, 0, 0.2, 1]
          }}
        >
        </motion.div>
      </div>
    </motion.div>
  );
};

SkillBar.propTypes = {
  skill: PropTypes.shape({
    name: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  isHighlighted: PropTypes.bool
};

export default memo(SkillBar);