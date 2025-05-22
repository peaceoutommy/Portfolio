import SectionTitle from '../../ui/SectionTitle';
import { motion } from 'framer-motion';
import AnimatedSection from '../../ui/AnimatedSection';
import GlowText from '../../ui/GlowText';

const Education = () => {
    const education = [
        { Title: "Fontys University", description: "Bachelors in Software Engineering" },
        { Title: "Citeforma", description: "ICT - Software development course" },
    ];

    return (
        <AnimatedSection id="education">
            {(inView) => (
                <>
                    <SectionTitle title="Education" inView={inView} />

                    <div className="flex flex-col md:flex-row w-full mt-16 text-center gap-8">
                        {education.map((item, i) => (
                            <motion.div
                                key={i}
                                className='flex flex-col transition-all duration-300 w-full md:w-1/3 mb-8 tokenomic-container'
                            >
                                <motion.div
                                    transition={{ duration: 0.3 }}
                                    whileHover={{ y: -5, x: 5 }}
                                    className='flex w-full h-full justify-between flex-col'
                                >
                                    <GlowText as="h3" className="text-xl text-white/70">
                                        {item.Title}
                                    </GlowText>
                                    <GlowText className="mt-4">
                                        {item.description}
                                    </GlowText>
                                    <div className="parallelogram mt-8"></div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </>
            )}
        </AnimatedSection>
    );
};

export default Education;