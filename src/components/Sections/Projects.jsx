// src/components/sections/Projects.jsx
import { useState, useEffect, useRef } from 'react';
import SectionTitle from '../ui/SectionTitle';
import AnimatedSection from '../ui/AnimatedSection';
import ProjectCard from '../ui/ProjectCard';

// Project data with proper shape
const PROJECTS = [
  {
    title: "Dionamite",
    description: "A modern, responsive platform built with React.js and TailwindCSS. It highlights the company's services, showcases the portfolio, and includes a contact form with mailing functionality.",
    tags: ["ReactJs", "TailwindCSS"],
    image: "./dionamite.png",
    link: "https://dionamite.com/",
    github: null
  },
  {
    title: "Dionamite Academy",
    description: "A responsive task management application with drag-and-drop interface, team collaboration features, and real-time updates.",
    tags: ["ReactJs", "NodeJs", "MongoDB", "ExpressJs", "Tailwind CSS"],
    image: "./dionamiteacademy.png",
    link: "https://dionamite.academy/",
    github: null
  },
  {
    title: "Mr Wipe",
    description: "A cross-platform mobile application for scheduling car cleaning services. Features a live map view, user authentication, and payment processing.",
    tags: ["React Native", "NodeJs", "MongoDB", "ExpressJs", "Tailwind CSS"],
    image: "../../api/placeholder/400/300",
    link: null,
    github: null
  },
  {
    title: "Community Blog Platform",
    description: "A full-featured blog platform with rich text editing, comments, user profiles, and content moderation capabilities.",
    tags: ["Next.js", "PostgreSQL", "AWS S3"],
    image: "/api/placeholder/400/300",
    link: "#",
    github: "#"
  }
];

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const projectRefs = useRef([]);
  
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {PROJECTS.map((project, index) => (
              <div 
                key={index}
                ref={el => projectRefs.current[index] = el}
                className="project-card-container"
              >
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
        </>
      )}
    </AnimatedSection>
  );
};

export default Projects;