import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useMobileDetection } from '../../../hooks/useMobileDetection';
import {
  SECTION_VARIANTS,
  CONTAINER_VARIANTS,
  ITEM_VARIANTS
} from '../../../constants/animations';
import { BREAKPOINTS, DELAYS } from '../../../constants';
import SectionTitle from '../../ui/SectionTitle';
import AnimatedSection from '../../ui/AnimatedSection';
import ProjectCard from '../../ui/ProjectCard';
import GlowText from '../../ui/GlowText';
import PixelChevron from '../../ui/PixelChevron';
import ViewMore from '../../ui/ViewMore';
import { GetProjects } from '../../../data/projectsData';

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const projectRefs = useRef([]);
  const PROJECTS = GetProjects();

  // Use standardized mobile detection
  const isMobile = useMobileDetection(BREAKPOINTS.SM);

  // Number of projects to show initially
  const initialProjectCount = 3;
  const visibleProjects = showAllProjects ? PROJECTS : PROJECTS.slice(0, initialProjectCount);

  // Set up refs for all projects
  useEffect(() => {
    projectRefs.current = projectRefs.current.slice(0, PROJECTS.length);
  }, []);

  // Reset active project when switching between mobile/desktop
  useEffect(() => {
    if (isMobile) {
      updateActiveProjectBasedOnScroll();
    } else {
      setActiveProject(null);
    }
  }, [isMobile]);

  // Toggle function for showing all projects
  const toggleShowAllProjects = () => {
    setShowAllProjects(!showAllProjects);

    // Scroll to put projects in view
    if (showAllProjects && projectRefs.current[initialProjectCount - 1]) {
      setTimeout(() => {
        projectRefs.current[initialProjectCount - 1].scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  };

  // Handle mouse interactions for desktop
  const handleMouseEnter = (index) => {
    if (!isMobile) {
      setActiveProject(index);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setActiveProject(null);
    }
  };

  const handleProjectClick = (project) => {
    setHasInteracted(true);
  };

  // Calculate which project is most visible (mobile only)
  const updateActiveProjectBasedOnScroll = () => {
    if (!isMobile || !projectRefs.current.length) return;

    const viewportHeight = window.innerHeight;
    const viewportCenter = viewportHeight / 2;
    let mostVisibleIndex = null;
    let highestVisibility = 0;

    projectRefs.current.forEach((element, index) => {
      if (!element) return;
      const rect = element.getBoundingClientRect();

      if (rect.top < viewportHeight && rect.bottom > 0) {
        const elementCenter = rect.top + (rect.height / 2);
        const distanceFromCenter = Math.abs(viewportCenter - elementCenter);
        const visibilityScore = 1 - (distanceFromCenter / viewportHeight);

        if (visibilityScore > highestVisibility) {
          highestVisibility = visibilityScore;
          mostVisibleIndex = index;
        }
      }
    });

    if (mostVisibleIndex !== null) {
      setActiveProject(mostVisibleIndex);
      if (!hasInteracted) setHasInteracted(true);
    }
  };

  // Mobile scroll listener
  useEffect(() => {
    if (!isMobile) return;

    let rafId = null;
    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateActiveProjectBasedOnScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    const timeoutId = setTimeout(updateActiveProjectBasedOnScroll, 500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, [isMobile]);

  return (
    <AnimatedSection id="projects" variant="stagger">
      {(inView) => (
        <>
          <SectionTitle title="My Projects" inView={inView} />

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mt-12"
            variants={CONTAINER_VARIANTS.grid}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {visibleProjects.map((project, index) => (
              <motion.div
                key={index}
                ref={el => projectRefs.current[index] = el}
                className="relative"
                onClick={() => handleProjectClick(project)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                variants={ITEM_VARIANTS.scaleIn}
              >

                {activeProject === index && !hasInteracted && !isMobile && (
                  <motion.div
                    className="absolute -top-10 left-1 transform z-30 pointer-events-none"
                    variants={ITEM_VARIANTS.fadeInUp}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                      className="view-more-text mb-4 flex flex-row items-center gap-2"
                    >
                      <GlowText intensity="medium">Click</GlowText>
                      <PixelChevron />
                    </motion.div>
                  </motion.div>
                )}

                <ProjectCard
                  project={project}
                  index={index}
                  isActive={activeProject === index}
                  inView={inView}
                  isMobile={isMobile}
                />
              </motion.div>
            ))}
          </motion.div>

          {PROJECTS.length > initialProjectCount && (
            <motion.div
              className="flex flex-col items-center mt-12"
              variants={ITEM_VARIANTS.fadeInUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ delay: visibleProjects.length * DELAYS.STAGGER_CHILD }}
            >
              <ViewMore
                isExpanded={showAllProjects}
                onClick={toggleShowAllProjects}
                expandedText="Show less"
                collapsedText="Show more"
                ariaLabel={showAllProjects ? "Show less projects" : "Show more projects"}
              />
            </motion.div>
          )}
        </>
      )}
    </AnimatedSection>
  );
};

export default Projects;