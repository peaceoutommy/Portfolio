import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Skills = () => {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: false,
    });

    const skillCategories = [
        {
            category: "Frontend",
            skills: [
                { name: "React", level: 90 },
                { name: "Vue.js", level: 75 },
                { name: "HTML/CSS", level: 95 },
                { name: "JavaScript", level: 90 },
                { name: "TypeScript", level: 85 },
            ]
        },
        {
            category: "Backend",
            skills: [
                { name: "Node.js", level: 85 },
                { name: "Express", level: 80 },
                { name: "PostgreSQL", level: 75 },
                { name: "MongoDB", level: 80 },
                { name: "Firebase", level: 70 },
            ]
        },
        {
            category: "Other",
            skills: [
                { name: "Git", level: 85 },
                { name: "Docker", level: 70 },
                { name: "AWS", level: 65 },
                { name: "CI/CD", level: 75 },
                { name: "Testing", level: 80 },
            ]
        }
    ];

    return (
        <motion.div
            ref={ref}
            className="w-full mt-16 md:mt-32"
            id="skills"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
            transition={{ duration: 0.3 }}
        >
            <h2 className="text-3xl neon-text text-center mb-12">My Skills</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                {skillCategories.map((category, categoryIndex) => (
                    <motion.div
                        key={categoryIndex}
                        className="card p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                        transition={{ duration: 0.3, delay: categoryIndex * 0.1 }}
                    >
                        <h3 className="text-2xl neon-text text-white mb-6">{category.category}</h3>
                        
                        <div className="space-y-4">
                            {category.skills.map((skill, skillIndex) => (
                                <div key={skillIndex} className="w-full">
                                    <div className="flex justify-between mb-2">
                                        <span className="neon-text">{skill.name}</span>
                                        <span className="neon-text">{skill.level}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-[var(--highlight-color)]"
                                            initial={{ width: 0 }}
                                            animate={{ width: inView ? `${skill.level}%` : 0 }}
                                            transition={{ duration: 0.6, delay: 0.2 + skillIndex * 0.1 }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Skills;