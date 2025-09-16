import SectionTitle from '../../ui/SectionTitle';
import { motion } from 'framer-motion';
import AnimatedSection from '../../ui/AnimatedSection';
import GlowText from '../../ui/GlowText';
import { CONTAINER_VARIANTS, ITEM_VARIANTS, CARD_VARIANTS } from '../../../constants/animations';
import { useState } from 'react';

const Education = () => {
    const [hoveredItem, setHoveredItem] = useState(null);
    
    const education = [
        { Title: "Fontys University", description: "Bachelor's in Software Engineering" },
        { Title: "Citeforma", description: "Minor in Software development" },
        { Title: "EBSC", description: "High School in Science and Technology" }
    ];

    return (
        <AnimatedSection id="education" variant="stagger">
            {(inView) => (
                <>
                    <SectionTitle title="Education" inView={inView} />

                    <motion.div
                        className="flex flex-col md:flex-row w-full mt-16 text-center gap-8"
                        variants={CONTAINER_VARIANTS.grid}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                    >
                        {education.map((item, i) => (
                            <motion.div
                                key={i}
                                className='flex flex-col transition-all duration-200 w-full md:w-1/3 mb-8 tokenomic-container'
                                variants={ITEM_VARIANTS.scaleIn}
                                onMouseEnter={() => setHoveredItem(i)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                <motion.div
                                    className='flex w-full h-full justify-between flex-col'
                                    variants={CARD_VARIANTS.hover}
                                    whileHover="active"
                                    initial="inactive"
                                >
                                    
                                    <GlowText intensity={hoveredItem === i ? 'medium' : 'low'} className="text-xl">
                                        {item.Title}
                                    </GlowText>
                                    <span className="mt-4 text-base">
                                        {item.description}
                                    </span>
                                    <div className="parallelogram mt-8"></div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </>
            )}
        </AnimatedSection>
    );
};

export default Education;