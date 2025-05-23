// src/components/sections/Skills.jsx
import { useState, useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useMobileDetection } from '../../../hooks/useMobileDetection';
import { useHoverState } from '../../../hooks/useHoverState';
import { CARD_VARIANTS, CONTAINER_VARIANTS, ITEM_VARIANTS } from '../../../constants/animations';
import { BREAKPOINTS, INTERSECTION_THRESHOLDS } from '../../../constants';
import SectionTitle from '../../ui/SectionTitle';
import Card from '../../ui/Card';
import AnimatedSection from '../../ui/AnimatedSection';
import CategoryTab from '../../ui/CategoryTab';
import SkillBar from '../../ui/SkillBar';
import GlowText from '../../ui/GlowText';
import { SKILL_CATEGORIES, getSkillsByCategory, getCategoryIcon } from '../../../data/skillsData';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('Backend');
  const categoryRefs = useRef([]);

  const isMobile = useMobileDetection(BREAKPOINTS.SM);
  const categoryHover = useHoverState();
  const containerHover = useHoverState();

  // Create a separate ref for the skills container
  const { ref: containerInViewRef, inView: containerInView } = useInView({
    threshold: INTERSECTION_THRESHOLDS.MINIMAL,
    triggerOnce: false
  });

  // Set up refs for all categories
  useEffect(() => {
    categoryRefs.current = categoryRefs.current.slice(0, SKILL_CATEGORIES.length);
  }, []);

  // Memoize active skills to prevent unnecessary renders
  const activeSkills = useMemo(() => {
    return getSkillsByCategory(activeCategory);
  }, [activeCategory]);

  // Get icon for current category
  const activeCategoryIcon = useMemo(() => {
    return getCategoryIcon(activeCategory);
  }, [activeCategory]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const handleCategoryMouseEnter = (category) => {
    if (!isMobile) {
      categoryHover.handleMouseEnter(category);
      containerHover.handleMouseEnter('container');
    }
  };

  const handleCategoryMouseLeave = () => {
    if (!isMobile) {
      categoryHover.handleMouseLeave();
      containerHover.handleMouseLeave();
    }
  };

  const handleContainerMouseEnter = () => {
    if (!isMobile) {
      containerHover.handleMouseEnter('container');
    }
  };

  const handleContainerMouseLeave = () => {
    if (!isMobile) {
      containerHover.handleMouseLeave();
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
      categoryHover.handleMouseEnter(SKILL_CATEGORIES[mostVisibleIndex].category);
    }
  };

  // ✅ SIMPLIFIED: Mobile scroll handling with cleaner hook dependency
  useEffect(() => {
    // Only set up scroll listener if on mobile
    if (!isMobile) {
      categoryHover.clearHover();
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

  // ✅ SIMPLIFIED: Determine container highlight state
  const isContainerHighlighted = isMobile
    ? containerInView
    : containerHover.isHovered('container');

  return (
    <AnimatedSection id="skills">
      {(inView) => (
        <>
          <SectionTitle title="Skills" inView={inView} />

          {/* Category Tabs */}
          <motion.div 
            className="flex flex-wrap justify-center mb-12 gap-2 md:gap-4"
            variants={CONTAINER_VARIANTS.stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {SKILL_CATEGORIES.map((category, idx) => (
              <motion.div
                key={category.category}
                ref={el => categoryRefs.current[idx] = el}
                variants={ITEM_VARIANTS.scaleIn}
              >
                <CategoryTab
                  label={category.category}
                  icon={category.icon}
                  isActive={activeCategory === category.category}
                  isHighlighted={categoryHover.isHovered(category.category)}
                  onClick={() => handleCategoryClick(category.category)}
                  onMouseEnter={() => handleCategoryMouseEnter(category.category)}
                  onMouseLeave={handleCategoryMouseLeave}
                  index={idx}
                  inView={inView}
                  isMobile={isMobile}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Skills Container */}
          <div
            className="relative"
            ref={containerInViewRef}
            onMouseEnter={handleContainerMouseEnter}
            onMouseLeave={handleContainerMouseLeave}
          >
            <motion.div
              variants={CARD_VARIANTS.hover}
              initial="inactive"
              animate={isContainerHighlighted ? "active" : "inactive"}
            >
              <Card
                className="p-6 min-h-[400px] relative overflow-hidden"
                intensity={isContainerHighlighted ? "medium" : "none"}
                isActive={isContainerHighlighted}
              >
                {/* Accent corner */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[var(--highlight-color)]/20 rotate-12
                              rounded-lg transform origin-bottom-left" />

                {/* Category Title */}
                <div className="flex items-center gap-4 mb-8 relative">
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
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 relative"
                  key={activeCategory} // Force re-render on category change
                  variants={CONTAINER_VARIANTS.stagger}
                  initial="hidden"
                  animate="visible"
                >
                  {activeSkills.map((skill, idx) => (
                    <motion.div
                      key={skill.name}
                      variants={ITEM_VARIANTS.fadeInUp}
                    >
                      <SkillBar
                        skill={skill}
                        index={idx}
                        isHighlighted={isContainerHighlighted}
                      />
                    </motion.div>
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