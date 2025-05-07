import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Skills = () => {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: false,
    });

    const [activeCategory, setActiveCategory] = useState('Frontend');

    const skillCategories = [
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
            ]
        },
        {
            category: "Databases",
            icon: "fas fa-cogs",
            skills: [
                { name: "MySQL", level: 85 },
                { name: "SQL Server", level: 85 },
                { name: "Mongo DB", level: 79 },
            ]
        },
        {
            category: "Design",
            icon: "fas fa-palette",
            skills: [
                { name: "Figma", level: 80 },
                { name: "Adobe XD", level: 75 },
                { name: "UI/UX", level: 85 },
                { name: "Prototyping", level: 80 },
                { name: "Wireframing", level: 85 },
                { name: "Responsive Design", level: 90 },
                { name: "Color Theory", level: 75 },
            ]
        }
    ];

    // Get current active skills
    const activeSkills = skillCategories.find(cat => cat.category === activeCategory)?.skills || [];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };
    
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    return (
        <motion.div
            ref={ref}
            className="w-full mt-24 md:mt-48 pt-16"
            id="skills"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-3xl neon-text text-center mb-16 relative">
                <span className="relative z-10">My Skills</span>
                <motion.span 
                    className="absolute w-16 h-1 bg-[var(--highlight-color)] left-1/2 -bottom-4 transform -translate-x-1/2"
                    initial={{ width: 0 }}
                    animate={{ width: inView ? '4rem' : 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                />
            </h2>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center mb-12 gap-2 md:gap-4">
                {skillCategories.map((category, idx) => (
                    <motion.button
                        key={category.category}
                        className={`px-5 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 ${
                            activeCategory === category.category 
                                ? 'bg-[var(--highlight-color)]/20 border-2 border-[var(--highlight-color)] neon-text'
                                : 'bg-black/40 border-2 border-white/10 text-white/70 hover:border-white/30'
                        }`}
                        onClick={() => setActiveCategory(category.category)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        whileHover={{ 
                            boxShadow: activeCategory === category.category 
                                ? '0 0 8px var(--highlight-color)' 
                                : 'none'
                        }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <i className={`${category.icon} mr-2`}></i>
                        {category.category}
                    </motion.button>
                ))}
            </div>

            {/* Skills Display */}
            <div className="relative overflow-hidden p-2">
                <div 
                    className="card p-8 bg-black/50 backdrop-blur-[30px] rounded-lg border-2 border-white/20"
                    style={{
                        boxShadow: '0 0 30px rgba(var(--highlight-rgb), 0.1)',
                        minHeight: '400px'
                    }}
                >
                    {/* Category Title */}
                    <div className="flex items-center gap-4 mb-8">
                        <i className={`${skillCategories.find(c => c.category === activeCategory)?.icon || 'fas fa-code'} text-3xl neon-text`}></i>
                        <h3 className="text-2xl neon-text">{activeCategory} Skills</h3>
                    </div>
                    
                    {/* Grid for larger screens, scroll for mobile */}
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                        key={activeCategory} // This forces re-render of content when category changes
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {activeSkills.map((skill, idx) => (
                            <motion.div 
                                key={skill.name} 
                                className="w-full"
                                variants={itemVariants}
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
                                            delay: idx * 0.1,
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
                        ))}
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default Skills;