import SectionTitle from '../ui/SectionTitle';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Education = () => {

    const tokenomics = [
        { Title: "Fontys University", description: "Bachelors in Software Engineering" },
        { Title: "Citeforma", description: "ICT - Software development course" },
    ];

    const { ref, inView } = useInView({
        threshold: 0.1, // Trigger when 10% of the element is visible
        triggerOnce: false, // Only trigger once
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} // Start hidden and moved down
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }} // Animate based on inView state
            transition={{ duration: 0.3 }} // Animation duration
            ref={ref}
            className="w-full md:mt-48 mt-32" id="tokenomics">

            <SectionTitle title="Education" inView={inView} />

            <div className="flex flex-col md:flex-row w-full mt-16 text-center gap-8">
                {tokenomics.map((item, i) => {


                    return (
                        <motion.div

                            key={i}
                            className='flex flex-col transition-all duration-200 w-full md:w-1/3 mb-8 tokenomic-container'
                        >
                            <motion.div
                                transition={{ duration: 0.1 }}
                                whileHover={{ y: -5, x: 5 }}
                                className='flex w-full h-full justify-between flex-col'>
                                <h3 className="text-xl text-white/70">{item.Title}</h3>
                                <p className="neon-text mt-4">{item.description}</p>
                                <div className="parallelogram mt-8"></div>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default Education;