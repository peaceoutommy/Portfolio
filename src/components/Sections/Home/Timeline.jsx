// src/components/sections/Timeline.jsx - HIGHLY OPTIMIZED VERSION
import { useState, useMemo } from 'react';
import { useScrollProgress } from '../../../hooks/useScrollProgress';
import { useActiveTimelineItem } from '../../../hooks/useActiveTimelineItem';
import AnimatedSection from '../../ui/AnimatedSection';
import SectionTitle from '../../ui/SectionTitle';
import TimelineEvent from '../../ui/TimelineEvent';
import { EXPERIENCES } from '../../../data/experienceData';

const Timeline = () => {
  // ✅ MUCH CLEANER: Extract all scroll logic to custom hooks
  const { 
    timelineRef, 
    progress, 
    opacity 
  } = useScrollProgress({
    startThreshold: 0.8,
    endThreshold: 0.2
  });

  const activeIndex = useActiveTimelineItem({
    selector: '.timeline-event',
    threshold: 0.5
  });

  // ✅ PERFORMANCE: Memoize progress bar styles to prevent unnecessary re-renders
  const progressBarStyle = useMemo(() => ({
    height: `${progress * 100}%`,
    opacity,
    background: 'var(--highlight-color)',
    boxShadow: progress > 0 
      ? `0 0 10px var(--highlight-color), 0 0 ${progress * 5}px var(--highlight-color)` 
      : 'none'
  }), [progress, opacity]);

  const trackStyle = useMemo(() => ({
    background: 'rgba(255, 255, 255, 0.2)'
  }), []);

  return (
    <AnimatedSection id="timeline" ref={timelineRef}>
      {(inView) => (
        <>
          <SectionTitle title="Professional Experience" inView={inView} />

          <div className="relative mt-16">
            {/* ✅ SIMPLIFIED: Timeline track with memoized styles */}
            <div
              className="absolute h-full left-1/2 transform -translate-x-1/2 w-1.5 transition-all duration-500 z-10"
              style={trackStyle}
              aria-hidden="true"
            />
            
            {/* ✅ PERFORMANCE: Animated progress fill with memoized styles */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 w-1.5 transition-all duration-300 z-10 top-0"
              style={progressBarStyle}
              aria-hidden="true"
            />

            {/* ✅ CLEAN: Timeline entries with optimized rendering */}
            <div className="space-y-12 relative mb-16 z-20">
              {EXPERIENCES.map((experience, index) => (
                <TimelineEvent
                  key={`${experience.company}-${index}`} // More stable key
                  title={experience.title}
                  company={experience.company}
                  period={experience.period}
                  description={experience.description}
                  isLeft={index % 2 === 0}
                  isActive={activeIndex === index}
                  index={index}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </AnimatedSection>
  );
};

export default Timeline;