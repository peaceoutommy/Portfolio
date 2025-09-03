// src/components/ui/TimelineEvent.jsx - STANDARDIZED ANIMATIONS
import { memo } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { ITEM_VARIANTS, TIMELINE_VARIANTS } from '../../constants/animations';
import GlowContainer from './GlowContainer';
import GlowText from './GlowText';

/**
 * TimelineEvent - Standardized timeline event component with consistent animations
 */
const TimelineEvent = ({
  title,
  company,
  period,
  description,
  isLeft,
  isActive,
  index,
  inView
}) => {

  return (
    <motion.div
      className="flex flex-col md:flex-row items-center w-full z-30 timeline-event"
      variants={ITEM_VARIANTS.fadeInUp}
      data-index={index}
    >
      {isLeft ? (
        <>
          {/* Left side content */}
          <div className="w-full md:w-1/2 md:pr-8">
            <GlowContainer
              className="p-6"
              isActive={isActive}
              intensity={isActive ? "medium" : "none"}
              whileHover={{ y: -5 }}
            >
              <motion.div
                variants={TIMELINE_VARIANTS.timelineItem}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
              >
                <GlowText as="h3" className="text-xl mb-1" intensity={isActive ? "medium" : "low"}>
                  {title}
                </GlowText>
                <div className="flex flex-wrap justify-between items-center mb-4">
                  <p className="text-white/70">{company}</p>
                  <span className="text-xs md:text-sm text-white/50 whitespace-nowrap">{period}</span>
                </div>
                <GlowText className="text-sm md:text-base" intensity={isActive ? "low" : "none"}>
                  {description}
                </GlowText>
              </motion.div>
            </GlowContainer>
          </div>
          <div className="hidden md:block w-full md:w-1/2" />
        </>
      ) : (
        <>
          {/* Right side content */}
          <div className="hidden md:block w-full md:w-1/2" />
          <div className="w-full md:w-1/2 md:pl-8">
            <GlowContainer
              className="p-6"
              isActive={isActive}
              intensity={isActive ? "medium" : "none"}
              whileHover={{ y: -5 }}
            >
              <motion.div
                variants={TIMELINE_VARIANTS.timelineItem}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                transition={{ delay: index * 0.1 }}
              >
                <GlowText as="h3" className="text-xl mb-1" intensity={isActive ? "medium" : "low"}>
                  {title}
                </GlowText>
                <div className="flex flex-wrap justify-between items-center mb-4">
                  <p className="text-white/70">{company}</p>
                  <span className="text-xs md:text-sm text-white/50 whitespace-nowrap">{period}</span>
                </div>
                <GlowText className="text-sm md:text-base" intensity={isActive ? "low" : "none"}>
                  {description}
                </GlowText>
              </motion.div>
            </GlowContainer>
          </div>
        </>
      )}
    </motion.div>
  );
};

TimelineEvent.propTypes = {
  title: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isLeft: PropTypes.bool.isRequired,
  isActive: PropTypes.bool,
  index: PropTypes.number.isRequired,
  inView: PropTypes.bool
};

export default memo(TimelineEvent);