
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionTitle from './SectionTitle';

const Tokenomics = () => {

    const tokenomics = [
        { Title: "Total Supply", description: "100.000.000 $NNULL" },
        { Title: "Token Distribution", description: "1% for the team, 99% for the community!" },
        { Title: "Pump.Fun", description: "Pump-it up with our crazy tokenomics!" },
    ];

    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: false,
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} // Start hidden and moved down
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }} // Animate based on inView state
            transition={{ duration: 0.3 }} // Animation duration
            ref={ref}
            className="w-full md:mt-48 mt-32" id="tokenomics">


            <SectionTitle title="Tokenomics" inView={inView} />

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
                                <h3 className="text-xl neon-text text-white">{item.Title}</h3>
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

export default Tokenomics;