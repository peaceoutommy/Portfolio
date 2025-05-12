// src/components/sections/Skills.jsx
import { useState, useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';
import SectionTitle from '../ui/SectionTitle';
import Card from '../ui/Card';
import AnimatedSection from '../ui/AnimatedSection';
import CategoryTab from '../ui/CategoryTab';
import SkillBar from '../ui/SkillBar';
import GlowText from '../ui/GlowText';

// Skill data categorized
const SKILL_CATEGORIES = [
  {
    category: "Frontend",
    icon: "fas fa-code",
    skills: [
      { name: "React", level: 90 },
      { name: "JavaScript", level: 90 },
      { name: "Tailwind CSS", level: 88 },
      { name: "Blazor", level: 70 },
      { name: "HTML/CSS", level: 95 },
    ]
  },
  {
    category: "Backend",
    icon: "fas fa-server",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Express", level: 75 },
      { name: "C#", level: 80 },
      { name: ".NET", level: 80 },
      { name: "Python", level: 65 },
      { name: "Php", level: 63 },
    ]
  },
  {
    category: "Databases",
    icon: "fas fa-database",
    skills: [
      { name: "MySQL", level: 85 },
      { name: "SQL Server", level: 85 },
      { name: "MongoDB", level: 79 },
      { name: "MariaDB", level: 71 },
    ]
  },
  {
    category: "Version Control",
    icon: "fas fa-code-branch",
    skills: [
      { name: "Git", level: 83 },
      { name: "GitHub", level: 95 },
      { name: "GitLab", level: 80 },
    ]
  }
];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('Frontend');
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isContainerHovered, setIsContainerHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const categoryRefs = useRef([]);
  
  // Create a separate ref for the skills container
  const { ref: containerInViewRef, inView: containerInView } = useInView({
    threshold: 0.3,
    triggerOnce: false
  });
  
  // Set up refs for all categories
  useEffect(() => {
    categoryRefs.current = categoryRefs.current.slice(0, SKILL_CATEGORIES.length);
  }, []);
  
  // Detect mobile devices on component mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Memoize active skills to prevent unnecessary renders
  const activeSkills = useMemo(() => {
    return SKILL_CATEGORIES.find(cat => cat.category === activeCategory)?.skills || [];
  }, [activeCategory]);

  // Get icon for current category
  const activeCategoryIcon = useMemo(() => {
    return SKILL_CATEGORIES.find(cat => cat.category === activeCategory)?.icon || 'fas fa-code';
  }, [activeCategory]);

  // Handle category click for both mobile and desktop
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  // Handle mouse enter for desktop only
  const handleMouseEnter = (category) => {
    if (!isMobile) {
      setHoveredCategory(category);
      // Also set container as hovered when a category is hovered
      setIsContainerHovered(true);
    }
  };

  // Handle mouse leave for desktop only
  const handleMouseLeave = () => {
    if (!isMobile) {
      setHoveredCategory(null);
      // Also unset container as hovered
      setIsContainerHovered(false);
    }
  };
  
  // Calculate which category tab is most visible in the viewport (for mobile only)
  const updateActiveCategoryBasedOnScroll = () => {
    // Skip if we're not on mobile or refs aren't set
    if (!isMobile || !categoryRefs.current.some(ref => ref)) return;
    
    const viewportHeight = window.innerHeight;
    const viewportCenter = viewportHeight / 2;
    
    let mostVisibleIndex = null;
    let highestVisibility = 0;

    categoryRefs.current.forEach((element, index) => {
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

    // Only update if we found a visible category
    if (mostVisibleIndex !== null) {
      setHoveredCategory(SKILL_CATEGORIES[mostVisibleIndex].category);
    }
  };
  
  // Set up scroll event listener for mobile only
  useEffect(() => {
    // Only set up scroll listener if on mobile
    if (!isMobile) {
      setHoveredCategory(null);
      return;
    }
    
    // Use requestAnimationFrame for better performance
    let rafId = null;
    
    const handleScroll = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      
      rafId = requestAnimationFrame(() => {
        updateActiveCategoryBasedOnScroll();
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial calculation after a short delay to ensure refs are set
    const timeoutId = setTimeout(() => {
      updateActiveCategoryBasedOnScroll();
    }, 500);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      clearTimeout(timeoutId);
    };
  }, [isMobile]);

  // Determine if the container should be highlighted:
  // On Desktop: When any category is hovered
  // On Mobile: When the container is in viewport
  const isContainerHighlighted = isMobile 
    ? containerInView 
    : isContainerHovered;

  return (
    <AnimatedSection id="skills">
      {(inView) => (
        <>
          <SectionTitle title="Skills" inView={inView} />

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center mb-12 gap-2 md:gap-4">
            {SKILL_CATEGORIES.map((category, idx) => (
              <div 
                key={category.category}
                ref={el => categoryRefs.current[idx] = el}
              >
                <CategoryTab
                  label={category.category}
                  icon={category.icon}
                  isActive={activeCategory === category.category}
                  isHighlighted={hoveredCategory === category.category}
                  onClick={() => handleCategoryClick(category.category)}
                  onMouseEnter={() => handleMouseEnter(category.category)}
                  onMouseLeave={handleMouseLeave}
                  index={idx}
                  inView={inView}
                  isMobile={isMobile}
                />
              </div>
            ))}
          </div>

          {/* Skills Display - With proper hover/viewport highlighting */}
          <div 
            className="relative" 
            ref={containerInViewRef}
            onMouseEnter={() => !isMobile && setIsContainerHovered(true)}
            onMouseLeave={() => !isMobile && setIsContainerHovered(false)}
          >
            <motion.div
              initial={{ y: 0 }}
              animate={{ 
                y: isContainerHighlighted ? -5 : 0,
                transition: { 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20,
                  duration: 0.4
                }
              }}
            >
              <Card 
                className="p-6 min-h-[400px]"
                intensity={isContainerHighlighted ? "medium" : "none"}
                isActive={isContainerHighlighted}
                style={{
                  transition: "all 0.6s cubic-bezier(0.19, 1, 0.22, 1)",
                  boxShadow: isContainerHighlighted 
                    ? '0 0 20px rgba(var(--highlight-rgb), 0.7), 0 0 30px rgba(var(--highlight-rgb), 0.3)'
                    : undefined
                }}
              >
                {/* Category Title */}
                <div className="flex items-center gap-4 mb-8">
                  <span
                    className="text-3xl text-[var(--highlight-color)]"
                    style={{
                      textShadow: 'var(--text-shadow-md)',
                    }}
                  >
                    <i className={activeCategoryIcon} aria-hidden="true"></i>
                  </span>
                  <GlowText as="h3" className="text-2xl" intensity={isContainerHighlighted ? "medium" : "low"}>
                    {activeCategory} Skills
                  </GlowText>
                </div>

                {/* Grid for larger screens, single column for mobile */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  key={activeCategory} // Force re-render on category change
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.2
                      }
                    }
                  }}
                  initial="hidden"
                  animate="visible"
                >
                  {activeSkills.map((skill, idx) => (
                    <SkillBar 
                      key={skill.name} 
                      skill={skill} 
                      index={idx}
                      isHighlighted={isContainerHighlighted}
                    />
                  ))}
                </motion.div>
              </Card>
            </motion.div>
          </div>
        </>
      )}
    </AnimatedSection>
  );
};

export default Skills;