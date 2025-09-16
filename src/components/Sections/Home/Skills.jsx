// src/components/sections/Skills.jsx - STANDARDIZED ANIMATIONS
import { useState, useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useMobileDetection } from '../../../hooks/useMobileDetection';
import { useHoverState } from '../../../hooks/useHoverState';
import {
  SECTION_VARIANTS,
  CONTAINER_VARIANTS,
  ITEM_VARIANTS,
  CARD_VARIANTS,
  INTERSECTION_CONFIG
} from '../../../constants/animations';
import { BREAKPOINTS } from '../../../constants';
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

  // Use standardized hooks
  const isMobile = useMobileDetection(BREAKPOINTS.SM);
  const categoryHover = useHoverState();
  const containerHover = useHoverState();

  const { ref: containerInViewRef, inView: containerInView } = useInView({
    threshold: INTERSECTION_CONFIG.ITEM_THRESHOLD,
    triggerOnce: INTERSECTION_CONFIG.TRIGGER_ONCE
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

  // Category interaction handlers
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

  // Container hover handlers
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

  // Mobile scroll handling (simplified for brevity)
  const updateActiveCategoryBasedOnScroll = () => {
    if (!isMobile || !categoryRefs.current.some(ref => ref)) return;
  };

  useEffect(() => {
    if (!isMobile) {
      categoryHover.clearHover();
      return;
    }

    let rafId = null;
    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateActiveCategoryBasedOnScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    const timeoutId = setTimeout(updateActiveCategoryBasedOnScroll, 500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, [isMobile]);

  // Determine container highlight state
  const isContainerHighlighted = isMobile ? containerInView : containerHover.isHovered('container');

  return (

    <AnimatedSection id="skills" variant="stagger">
      {(inView) => (
        <>
          <SectionTitle title="Skills" inView={inView} />

          <motion.div
            className="flex flex-wrap justify-center mb-12 gap-2 md:gap-4"
            variants={CONTAINER_VARIANTS.grid}
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


          <div
            className="relative w-full"
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
                className="p-6 min-h-[400px]"
                intensity={isContainerHighlighted ? "medium" : "none"}
                isActive={isContainerHighlighted}
              >

                {/* Category Title */}
                <div className="flex items-center gap-4 mb-8 relative">
                  <span
                    className="text-3xl text-[var(--highlight-color)]"
                    style={{ textShadow: 'var(--text-shadow-md)' }}
                  >
                    <i className={activeCategoryIcon} aria-hidden="true"></i>
                  </span>
                  <GlowText as="h3" className="text-2xl" intensity={isContainerHighlighted ? "medium" : "low"}>
                    {activeCategory} Proficiency
                  </GlowText>
                </div>

                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 relative"
                  key={activeCategory}
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