// src/components/ui/TimelineEvent.jsx
import { memo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';
import Card from './Card';
import GlowText from './GlowText';

/**
 * TimelineEvent - A standardized timeline event component
 */
const TimelineEvent = ({ 
  title, 
  company, 
  period, 
  description, 
  isLeft, 
  isActive, 
  index 
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col md:flex-row items-center w-full z-30 timeline-event" 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ duration: 0.3 }}
      data-index={index}
    >
      
      {isLeft ? (
        <>
          <div className="w-full md:w-1/2 md:pr-8">
            <Card
              className="p-6"
              isActive={isActive}
              intensity={isActive ? "high" : "medium"}
              style={{
                transform: isActive ? 'translateY(-8px)' : 'translateY(0)',
              }}
            >
              <GlowText as="h3" className="text-xl mb-1" intensity={isActive ? "high" : "medium"}>
                {title}
              </GlowText>
              <div className="flex flex-wrap justify-between items-center mb-4">
                <p className="text-white/70">{company}</p>
                <span className="text-xs md:text-sm text-white/50 whitespace-nowrap">{period}</span>
              </div>
              <GlowText className="text-sm md:text-base" intensity="low">
                {description}
              </GlowText>
            </Card>
          </div>
          <div className="hidden md:block w-full md:w-1/2" />
        </>
      ) : (
        <>
          <div className="hidden md:block w-full md:w-1/2" />
          <div className="w-full md:w-1/2 md:pl-8">
            <Card
              className="p-6"
              isActive={isActive}
              intensity={isActive ? "high" : "medium"}
              style={{
                transform: isActive ? 'translateY(-8px)' : 'translateY(0)',
              }}
            >
              <GlowText as="h3" className="text-xl mb-1" intensity={isActive ? "high" : "medium"}>
                {title}
              </GlowText>
              <div className="flex flex-wrap justify-between items-center mb-4">
                <p className="text-white/70">{company}</p>
                <span className="text-xs md:text-sm text-white/50 whitespace-nowrap">{period}</span>
              </div>
              <GlowText className="text-sm md:text-base" intensity="low">
                {description}
              </GlowText>
            </Card>
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
  index: PropTypes.number.isRequired
};

export default memo(TimelineEvent);