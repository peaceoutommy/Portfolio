// src/components/sections/Timeline.jsx
import { useEffect, useRef, useState } from 'react';
import AnimatedSection from '../../ui/AnimatedSection';
import SectionTitle from '../../ui/SectionTitle';
import TimelineEvent from '../../ui/TimelineEvent';

// Career experience data
const EXPERIENCES = [
  { 
    title: "Software Engineer", 
    company: "Fontys University",
    period: "2024 – Present",
    description: "Designed and developed a scalable white-labeled web application for restaurant owners. Key features include automated stock management, menu configuration, and dynamic QR code generation for tables." 
  },
  { 
    title: "Full-Stack Developer", 
    company: "Freelancer",
    period: "2023 – Present",
    description: "Built and maintained several scalable web applications using the MERN stack, ensuring responsive design and robust backend architecture." 
  },
  { 
    title: "Backend Developer", 
    company: "Freelancer",
    period: "2023",
    description: "Implemented the backend of a web application for a remodeling company using the MERN stack, focusing on performance and data integrity." 
  },
  { 
    title: "Full-Stack Developer", 
    company: "Dionamite",
    period: "2023",
    description: "Participated in the development of two web applications and a mobile application, delivering full-featured solutions from frontend to backend." 
  },  
];

const Timeline = () => {
  const timelineRef = useRef(null);
  const progressRef = useRef(null);
  const filledRef = useRef(null);
  const [filledOpacity, setFilledOpacity] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);

  // Handle scroll-based animation of timeline progress bar
  useEffect(() => {
    const updateProgress = () => {
      if (!timelineRef.current || !progressRef.current || !filledRef.current) return;

      const timelineRect = timelineRef.current.getBoundingClientRect();
      const timelineTop = timelineRect.top;
      const timelineHeight = timelineRect.height;
      const windowHeight = window.innerHeight;
      
      // Only start progress when timeline is at least 20% in view
      if (timelineTop > windowHeight * 0.8) {
        // Timeline is not in view enough yet
        filledRef.current.style.height = '0%';
        setFilledOpacity(0);
        return;
      }
      
      // Calculate start and end points for progress animation
      const startPoint = windowHeight * 0.8;
      const endPoint = -timelineHeight + windowHeight * 0.2;
      
      // Calculate progress
      const adjustedProgress = (startPoint - timelineTop) / (startPoint - endPoint);
      const progress = Math.max(0, Math.min(adjustedProgress, 1));

      // Update progress bar styles
      filledRef.current.style.height = `${progress * 100}%`;
      
      // Add glow effect based on progress
      filledRef.current.style.boxShadow = progress > 0
        ? `0 0 10px var(--highlight-color), 0 0 ${progress * 5}px var(--highlight-color)`
        : 'none';

      setFilledOpacity(progress > 0 ? 1 : 0);
    };

    // Use requestAnimationFrame for performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', updateProgress);
    updateProgress(); // Initial update

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  // Calculate which event is most visible in the viewport
  useEffect(() => {
    const calculateMostVisibleEvent = () => {
      const eventElements = document.querySelectorAll('.timeline-event');
      if (!eventElements.length) return;

      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;
      
      let mostVisibleIndex = null;
      let highestVisibility = 0;

      eventElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        
        // Check if element is in viewport
        if (rect.top < viewportHeight && rect.bottom > 0) {
          // Calculate element center position relative to viewport
          const elementCenter = rect.top + (rect.height / 2);
          
          // Calculate distance from viewport center
          const distanceFromCenter = Math.abs(viewportCenter - elementCenter);
          
          // Calculate visibility score (higher score for elements closer to center)
          const visibilityScore = 1 - (distanceFromCenter / viewportHeight);
          
          if (visibilityScore > highestVisibility) {
            highestVisibility = visibilityScore;
            mostVisibleIndex = index;
          }
        }
      });

      setActiveIndex(mostVisibleIndex);
    };

    // Use requestAnimationFrame for smooth performance
    let rafId = null;
    const onScroll = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(calculateMostVisibleEvent);
    };

    window.addEventListener('scroll', onScroll);
    calculateMostVisibleEvent(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <AnimatedSection id="timeline" ref={timelineRef}>
      {(inView) => (
        <>
          <SectionTitle title="Professional Experience" inView={inView} />

          <div className="relative mt-16">
            {/* Timeline track */}
            <div
              ref={progressRef}
              className="absolute h-full left-1/2 transform -translate-x-1/2 w-1.5 transition-all duration-500 z-10"
              style={{
                background: `rgba(255, 255, 255, 0.2)`,
              }}
              aria-hidden="true"
            />
            
            {/* Animated progress fill */}
            <div
              ref={filledRef}
              className="absolute left-1/2 transform -translate-x-1/2 w-1.5 transition-all duration-300 z-10"
              style={{
                height: '0%',
                top: '0',
                opacity: filledOpacity,
                background: 'var(--highlight-color)'
              }}
              aria-hidden="true"
            />

            {/* Timeline entries */}
            <div className="space-y-12 relative mb-16 z-20">
              {EXPERIENCES.map((experience, index) => (
                <TimelineEvent
                  key={index}
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