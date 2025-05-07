import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';

// Career experience data
const experiences = [
  { 
    title: "Senior Frontend Developer", 
    company: "Tech Innovations Inc.",
    period: "2023 - Present",
    description: "Leading the frontend development team, implementing modern React practices, and optimizing application performance." 
  },
  { 
    title: "Frontend Developer", 
    company: "Digital Solutions Co.",
    period: "2020 - 2023",
    description: "Developed responsive web applications using React, Redux, and TypeScript. Collaborated with UX/UI designers to implement pixel-perfect interfaces." 
  },
  { 
    title: "Web Developer", 
    company: "Creative Web Agency",
    period: "2018 - 2020",
    description: "Built and maintained client websites using JavaScript, HTML, and CSS. Implemented responsive designs and CMS integrations." 
  },
  { 
    title: "Junior Developer", 
    company: "Startup Ventures",
    period: "2016 - 2018",
    description: "Assisted in development of web applications. Learned modern frontend frameworks and backend technologies." 
  },
  { 
    title: "Computer Science Degree", 
    company: "Tech University",
    period: "2012 - 2016",
    description: "Bachelor's degree in Computer Science with focus on software development." 
  }
];

const Timeline = () => {
  const timelineRef = useRef(null);
  const progressRef = useRef(null);
  const filledRef = useRef(null);
  const [filledOpacity, setFilledOpacity] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

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
      
      // Adjust calculation to delay start until timeline is more in view
      // Start filling when timeline top is 80% of window height (20% in view)
      // Complete when timeline bottom is 20% of window height (80% passed)
      const startPoint = windowHeight * 0.8;
      const endPoint = -timelineHeight + windowHeight * 0.2;
      
      // Calculate adjusted progress
      const adjustedProgress = (startPoint - timelineTop) / (startPoint - endPoint);
      const progress = Math.max(0, Math.min(adjustedProgress, 1));

      // Update progress bar styles
      progressRef.current.style.background = `rgba(255, 255, 255, 0.2)`;
      filledRef.current.style.background = `var(--highlight-color)`;
      filledRef.current.style.height = `${progress * 100}%`;
      filledRef.current.style.top = '0';
      
      // Add glow effect based on progress
      filledRef.current.style.boxShadow = progress > 0
        ? `0 0 10px var(--highlight-color), 0 0 ${progress * 5}px var(--highlight-color)`
        : 'none';

      // Update opacity state for animation
      setFilledOpacity(progress > 0 ? 1 : 0);
    };

    // Handle scroll events with requestAnimationFrame for performance
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
    <motion.div
      ref={(el) => {
        timelineRef.current = el; // Attach ref for scroll animation
        ref(el); // Also attach inView ref
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ duration: 0.3 }}
      className="w-full md:mt-48 mt-32"
      id="timeline"
    >
      <h2 className="text-3xl neon-text mb-8 text-center">
        Professional Experience
      </h2>

      <div className="relative mt-16">
        {/* Timeline track - Adjusted z-index */}
        <div
          ref={progressRef}
          className="absolute h-full left-1/2 transform -translate-x-1/2 w-1.5 transition-all duration-500 z-10"
          style={{
            background: `rgba(255, 255, 255, 0.2)`,
          }}
        />
        
        {/* Animated progress fill - Adjusted z-index */}
        <div
          ref={filledRef}
          className="absolute left-1/2 transform -translate-x-1/2 w-1.5 transition-all duration-300 z-10"
          style={{
            height: '0%',
            top: '0',
            opacity: filledOpacity,
          }}
        />

        {/* Timeline entries - Adjusted z-index */}
        <div className="space-y-12 relative mb-16 z-20">
          {experiences.map((experience, index) => (
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
    </motion.div>
  );
};

const TimelineEvent = ({ title, company, period, description, isLeft, isActive, index }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Enhanced card style for active card
  const cardStyle = {
    transform: isActive ? 'translateY(-8px)' : 'translateY(0)',
    boxShadow: isActive 
      ? `0 0 8px var(--highlight-color), 0 0 12px rgba(var(--highlight-rgb), 0.2)` 
      : 'none',
    borderColor: isActive ? 'var(--highlight-color)' : '',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  return (
    <motion.div
      ref={ref}
      className="flex flex-col md:flex-row items-center w-full z-30 timeline-event" 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ duration: 0.3 }}
      data-index={index}
    >
      {/* No timeline dots */}
      
      {isLeft ? (
        <>
          <div className="w-full md:w-1/2 md:pr-8">
            <div 
              className="card p-6"
              style={cardStyle}
            >
              <h3 className="text-xl neon-text mb-1">{title}</h3>
              <div className="flex justify-between items-center mb-4">
                <p className="text-white/70">{company}</p>
                <span className="text-sm text-white/50">{period}</span>
              </div>
              <p className="neon-text">{description}</p>
            </div>
          </div>
          <div className="hidden md:block w-full md:w-1/2" />
        </>
      ) : (
        <>
          <div className="hidden md:block w-full md:w-1/2" />
          <div className="w-full md:w-1/2 md:pl-8">
            <div 
              className="card p-6"
              style={cardStyle}
            >
              <h3 className="text-xl neon-text mb-1">{title}</h3>
              <div className="flex justify-between items-center mb-4">
                <p className="text-white/70">{company}</p>
                <span className="text-sm text-white/50">{period}</span>
              </div>
              <p className="neon-text">{description}</p>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

// Prop validation for TimelineEvent
TimelineEvent.propTypes = {
  title: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isLeft: PropTypes.bool.isRequired,
  isActive: PropTypes.bool,
  index: PropTypes.number.isRequired
};

export default Timeline;