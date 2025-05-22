import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Card from '../../Ui/Card';
import GlowText from '../../Ui/GlowText';

const Features = () => {
    const { ref, inView } = useInView({
        threshold: 0.1, // Trigger when 10% of the element is visible
        triggerOnce: false, // Only trigger once
    });

    const features = [
        {
            title: "To the Moon",
            description: "NNULL is designed to skyrocket in value, taking your investments to the moon.",
        },
        {
            title: "Strong Community",
            description: "Join a vibrant community of crypto enthusiasts and investors.",
        },
        {
            title: "Exponential Growth",
            description: "Watch your investment grow exponentially with our innovative growth strategies.",
        }
    ];

    return (
        <motion.div
            ref={ref}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-16 md:mt-32"
            id='features'
            initial={{ opacity: 0, y: 20 }} // Initial state: hidden and moved down
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }} // Animate based on inView state
            transition={{ duration: 0.3 }} // Animation duration
        >
            {features.map((feature, index) => (
                <Card key={index} className="p-6">
                    <h3 className="text-2xl text-white mt-4">
                      <GlowText intensity="medium">Feature {index + 1}: {feature.title}</GlowText>
                    </h3>
                    <p className="mt-4 text-white/80">
                      <GlowText intensity="low">{feature.description}</GlowText>
                    </p>
                </Card>
            ))}
        </motion.div>
    );
}

export default Features;
