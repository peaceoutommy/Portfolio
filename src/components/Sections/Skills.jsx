// src/components/sections/Skills.jsx
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';
import SectionTitle from '../ui/SectionTitle';
import Card from '../ui/Card';

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

// Skill bar component
const SkillBar = ({ skill, index }) => {
  return (
    <motion.div
      className="w-full"
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.5,
            delay: index * 0.1
          }
        }
      }}
    >
      <div className="flex justify-between mb-2">
        <span className="neon-text">{skill.name}</span>
        <span className="neon-text">{skill.level}%</span>
      </div>
      <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
        <motion.div
          className="h-full rounded-full relative"
          style={{
            background: `linear-gradient(90deg, rgba(var(--highlight-rgb), 0.7) 0%, rgba(var(--highlight-rgb), 1) 100%)`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{
            duration: 1.5,
            delay: index * 0.1,
            ease: [0.4, 0, 0.2, 1]
          }}
        >
          {/* Animated particles within the bar */}
          <div className="absolute top-0 right-0 h-full w-8 overflow-hidden">
            <div className="absolute inset-0 skill-sparkle"></div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

SkillBar.propTypes = {
  skill: PropTypes.shape({
    name: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired
};

// Category Tab component
const CategoryTab = ({ category, isActive, onClick, icon, index, inView }) => {
  return (
    <motion.button
      className={`px-5 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 ${
        isActive
          ? 'bg-[var(--highlight-color)]/20 border-2 border-[var(--highlight-color)] neon-text'
          : 'bg-black/40 border-2 border-white/10 text-white/70 hover:border-white/30'
      }`}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        boxShadow: isActive
          ? '0 0 8px var(--highlight-color)'
          : 'none'
      }}
      whileTap={{ scale: 0.98 }}
      aria-pressed={isActive}
    >
      <i className={`${icon} mr-2`} aria-hidden="true"></i>
      {category}
    </motion.button>
  );
};

CategoryTab.propTypes = {
  category: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  inView: PropTypes.bool.isRequired
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('Frontend');
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Memoize active skills to prevent unnecessary renders
  const activeSkills = useMemo(() => {
    return SKILL_CATEGORIES.find(cat => cat.category === activeCategory)?.skills || [];
  }, [activeCategory]);

  // Get icon for current category
  const activeCategoryIcon = useMemo(() => {
    return SKILL_CATEGORIES.find(cat => cat.category === activeCategory)?.icon || 'fas fa-code';
  }, [activeCategory]);

  return (
    <motion.section
      ref={ref}
      className="w-full mt-32 md:mt-48"
      id="skills"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ duration: 0.5 }}
    >
      <SectionTitle title="Skills" inView={inView} />

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center mb-12 gap-2 md:gap-4">
        {SKILL_CATEGORIES.map((category, idx) => (
          <CategoryTab
            key={category.category}
            category={category.category}
            isActive={activeCategory === category.category}
            onClick={() => setActiveCategory(category.category)}
            icon={category.icon}
            index={idx}
            inView={inView}
          />
        ))}
      </div>

      {/* Skills Display */}
      <div className="relative overflow-hidden">
        <Card 
          className="p-6"
          style={{
            boxShadow: '0 0 30px rgba(var(--highlight-rgb), 0.1)',
            minHeight: '400px'
          }}
        >
          {/* Category Title */}
          <div className="flex items-center gap-4 mb-8">
            <i className={`${activeCategoryIcon} text-3xl neon-text`} aria-hidden="true"></i>
            <h3 className="text-2xl neon-text">{activeCategory} Skills</h3>
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
    </motion.section>
  );
};

export default Skills;