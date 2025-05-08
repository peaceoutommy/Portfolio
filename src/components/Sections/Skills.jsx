// src/components/sections/Skills.jsx
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
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
  
  // Memoize active skills to prevent unnecessary renders
  const activeSkills = useMemo(() => {
    return SKILL_CATEGORIES.find(cat => cat.category === activeCategory)?.skills || [];
  }, [activeCategory]);

  // Get icon for current category
  const activeCategoryIcon = useMemo(() => {
    return SKILL_CATEGORIES.find(cat => cat.category === activeCategory)?.icon || 'fas fa-code';
  }, [activeCategory]);

  return (
    <AnimatedSection id="skills">
      {(inView) => (
        <>
          <SectionTitle title="Skills" inView={inView} />

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center mb-12 gap-2 md:gap-4">
            {SKILL_CATEGORIES.map((category, idx) => (
              <CategoryTab
                key={category.category}
                label={category.category}
                icon={category.icon}
                isActive={activeCategory === category.category}
                onClick={() => setActiveCategory(category.category)}
                index={idx}
                inView={inView}
              />
            ))}
          </div>

          {/* Skills Display */}
          <div className="relative overflow-hidden">
            <Card 
              className="p-6"
              intensity={activeCategory === "Frontend" ? "high" : "medium"}
              style={{
                minHeight: '400px'
              }}
            >
              {/* Category Title */}
              <div className="flex items-center gap-4 mb-8">
                <i className={`${activeCategoryIcon} text-3xl`} aria-hidden="true"></i>
                <GlowText as="h3" className="text-2xl" intensity="high">
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
                  <SkillBar key={skill.name} skill={skill} index={idx} />
                ))}
              </motion.div>
            </Card>
          </div>
        </>
      )}
    </AnimatedSection>
  );
};

export default Skills;