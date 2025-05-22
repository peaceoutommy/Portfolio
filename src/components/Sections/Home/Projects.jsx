import { useState, useEffect, useRef } from 'react';
import SectionTitle from '../../ui/SectionTitle';
import AnimatedSection from '../../ui/AnimatedSection';
import ProjectCard from '../../ui/ProjectCard';
import GlowText from '../../ui/GlowText';
import PixelChevron from '../../ui/PixelChevron';
import ViewMore from '../../ui/ViewMore';
import { GetProjects } from '../../../data/projectsData';
import { motion } from 'framer-motion';

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false); // Track if user has interacted with any card
  const projectRefs = useRef([]);
  const PROJECTS = GetProjects();

  // Number of projects to show initially
  const initialProjectCount = 3;

  // Projects to display based on toggle state
  const visibleProjects = showAllProjects
    ? PROJECTS
    : PROJECTS.slice(0, initialProjectCount);

  // Set up refs for all projects
  useEffect(() => {
    projectRefs.current = projectRefs.current.slice(0, PROJECTS.length);
  }, []);

  // Detect mobile devices on component mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);

      // Reset active project when switching between mobile and desktop
      if (mobile) {
        updateActiveProjectBasedOnScroll();
      } else {
        setActiveProject(null);
      }
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Toggle function for showing all projects
  const toggleShowAllProjects = () => {
    setShowAllProjects(!showAllProjects);

    // If closing the projects, scroll back up to the first hidden project
    if (showAllProjects && projectRefs.current[initialProjectCount - 1]) {
      setTimeout(() => {
        projectRefs.current[initialProjectCount - 1].scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  };

  // Handle mouse enter for desktop only
  const handleMouseEnter = (index) => {
    if (!isMobile) {
      setActiveProject(index);
    }
  };

  // Handle mouse leave for desktop only
  const handleMouseLeave = () => {
    if (!isMobile) {
      setActiveProject(null);
    }
  };

  // Handle click on a project card
  const handleProjectClick = (project) => {
    // Mark that user has interacted with cards
    setHasInteracted(true);

    // Additional click handling logic here
    // For example: opening a modal with project details
  };

  // Calculate which project is most visible in the viewport (for mobile only)
  const updateActiveProjectBasedOnScroll = () => {
    // Skip if we're not on mobile or refs aren't set
    if (!isMobile || !projectRefs.current.length) return;

    const viewportHeight = window.innerHeight;
    const viewportCenter = viewportHeight / 2;

    let mostVisibleIndex = null;
    let highestVisibility = 0;

    projectRefs.current.forEach((element, index) => {
      if (!element) return;

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

    // Only update if we found a visible project
    if (mostVisibleIndex !== null) {
      setActiveProject(mostVisibleIndex);

      // Mark as interacted when scrolling on mobile
      if (!hasInteracted) {
        setHasInteracted(true);
      }
    }
  };

  // Set up scroll event listener for mobile only
  useEffect(() => {
    // Only set up scroll listener if on mobile
    if (!isMobile) return;

    // Use requestAnimationFrame for better performance
    let rafId = null;

    const handleScroll = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        updateActiveProjectBasedOnScroll();
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial calculation after a short delay to ensure refs are set
    const timeoutId = setTimeout(() => {
      updateActiveProjectBasedOnScroll();
    }, 500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      clearTimeout(timeoutId);
    };
  }, [isMobile]);

  return (
    <AnimatedSection id="projects">
      {(inView) => (
        <>
          <SectionTitle title="My Projects" inView={inView} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mt-12">
            {visibleProjects.map((project, index) => (
              <div
                key={index}
                ref={el => projectRefs.current[index] = el}
                className="project-card-container relative"
                onClick={() => handleProjectClick(project)}
              >
                {/* Click Me button - shown on the currently hovered card */}
                {activeProject === index && !hasInteracted && !isMobile && (
                  <motion.div
                    className="absolute -top-10 z-20"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{
                      opacity: 1,
                      y: [0, -5, 0],
                    }}
                    transition={{
                      opacity: { duration: 0.2 },
                      y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
                    }}
                  >
                    <div className="view-more-text mb-4 flex flex-row items-center gap-2">
                      <GlowText intensity="medium">
                        Click
                      </GlowText>
                      <PixelChevron />
                    </div>
                  </motion.div>
                )}

                <ProjectCard
                  project={project}
                  index={index}
                  isActive={activeProject === index}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  inView={inView}
                  isMobile={isMobile}
                />
              </div>
            ))}
          </div>

          {PROJECTS.length > initialProjectCount && (
            <motion.div
              className="flex flex-col items-center mt-12"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: inView ? 1 : 0,
                y: inView ? 0 : 10
              }}
              transition={{ duration: 0.3, delay: visibleProjects.length * 0.1 }}
            >
              <ViewMore
                isExpanded={showAllProjects}
                onClick={toggleShowAllProjects}
                expandedText="View less"
                collapsedText="View more"
                ariaLabel={showAllProjects ? "View less projects" : "View more projects"}
              />
            </motion.div>
          )}
        </>
      )}
    </AnimatedSection>
  );
};

export default Projects;