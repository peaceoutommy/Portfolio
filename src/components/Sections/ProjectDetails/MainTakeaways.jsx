import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useHoverState } from '../../../hooks/useHoverState';
import { CARD_VARIANTS } from '../../../constants/animations';
import Card from '../../ui/Card';
import GlowText from '../../ui/GlowText';
import Icons from '../../ui/Icons';

const MainTakeaways = ({ takeaways }) => {
    const { handleMouseEnter, handleMouseLeave, isHovered } = useHoverState();

    // Don't render if no takeaways
    if (!takeaways || takeaways.length === 0) {
        return null;
    }

    return (
        <motion.div
            variants={CARD_VARIANTS.hover}
            initial="inactive"
            animate={isHovered('takeaways') ? "active" : "inactive"}
        >
            <Card
                className="p-6"
                isActive={isHovered('takeaways')}
                intensity={isHovered('takeaways') ? 'medium' : 'none'}
                onMouseEnter={() => handleMouseEnter('takeaways')}
                onMouseLeave={handleMouseLeave}
            >
                <div className="flex items-center mb-6">
                    <GlowText as="h3" className="text-lg font-semibold" intensity={isHovered('takeaways') ? "medium" : "low"}>
                        Main Takeaways
                    </GlowText>
                </div>

                <div className="space-y-4">
                    {takeaways.map((takeaway, index) => (
                        <motion.div
                            key={index}
                            className="group relative"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >

                            <p className="text-sm leading-relaxed text-white/90">
                                {takeaway}
                            </p>


                            {/* Connecting line to next takeaway (except for last one) */}
                            {index < takeaways.length - 1 && (
                                <motion.div
                                    className="flex justify-center py-2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: (index + 1) * 0.1 + 0.2 }}
                                >
                                    <div className="w-px h-3 bg-gradient-to-b from-[var(--highlight-color)]/30 to-transparent" />
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </Card>
        </motion.div>
    );
};

MainTakeaways.propTypes = {
    takeaways: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default MainTakeaways;
