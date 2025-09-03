import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Card from '../../ui/Card';
import GlowText from '../../ui/GlowText';
import { INTERSECTION_THRESHOLDS } from '../../../constants';
import { CONTAINER_VARIANTS, ITEM_VARIANTS } from '../../../constants/animations';

const Features = () => {
    const { ref, inView } = useInView({
        threshold: INTERSECTION_THRESHOLDS.MINIMAL,
        triggerOnce: false,
    });

    const features = [
        {
            title: "Responsive Design",
            description: "All projects are built with mobile-first design principles and work seamlessly across all devices.",
        },
        {
            title: "Modern Technologies",
            description: "Built using the latest web technologies including React, TypeScript, and modern CSS frameworks.",
        },
        {
            title: "Performance Focused",
            description: "Optimized for speed and performance with lazy loading, code splitting, and efficient rendering.",
        }
    ];

    return (
        <motion.div
            ref={ref}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-16 md:mt-32"
            id='features'
            variants={CONTAINER_VARIANTS.grid}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
        >
            {features.map((feature, index) => (
                <motion.div
                    key={index}
                    variants={ITEM_VARIANTS.scaleIn}
                >
                    <Card className="p-6">
                        <h3 className="text-2xl text-white mt-4">
                            <GlowText intensity="medium">Feature {index + 1}: {feature.title}</GlowText>
                        </h3>
                        <p className="mt-4 text-base">
                            <GlowText intensity="low">{feature.description}</GlowText>
                        </p>
                    </Card>
                </motion.div>
            ))}
        </motion.div>
    );
}

export default Features;