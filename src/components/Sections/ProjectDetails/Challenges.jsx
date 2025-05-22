import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import Card from './../../Ui/Card';
import GlowText from './../../Ui/GlowText';
import Icons from './../../Ui/Icons';


const Challenges = ({
    challenges,
    solutions,
    expandedChallenges,
    onToggleExpansion
}) => {
    // Don't render if no challenges or solutions
    if (!challenges || !solutions || challenges.length === 0 || solutions.length === 0) {
        return null;
    }

    return (
        <>
            <div className="space-y-4">
                {challenges.map((challenge, index) => (
                    <motion.div
                        key={index}
                        className="group relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15, duration: 0.4 }}
                    >
                        {/* Challenge Card */}
                        <motion.div
                            className={`relative rounded-xl border transition-all duration-500 cursor-pointer overflow-hidden
                  ${expandedChallenges[index]
                                    ? 'border-[var(--highlight-color)]/60 bg-[var(--highlight-color)]/5'
                                    : 'border-[var(--highlight-color)]/20 hover:border-[var(--highlight-color)]/40'
                                }`}
                            onClick={() => onToggleExpansion(index)}
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {/* Glowing border effect on hover */}
                            <motion.div
                                className="absolute inset-0 rounded-xl"
                                initial={false}
                                animate={{
                                    boxShadow: expandedChallenges[index]
                                        ? `0 0 20px rgba(var(--highlight-rgb), 0.3)`
                                        : '0 0 0px rgba(var(--highlight-rgb), 0)'
                                }}
                                transition={{ duration: 0.3 }}
                            />

                            {/* Card Header */}
                            <div className="relative p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {/* Challenge Number Badge */}
                                        <motion.div
                                            className="relative"
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500/20 to-red-600/30 border border-red-500/30 flex items-center justify-center">
                                                <span className="text-xs font-bold text-red-300">
                                                    {String(index + 1).padStart(2, '0')}
                                                </span>
                                            </div>
                                            {/* Subtle glow effect */}
                                            <div className="absolute inset-0 rounded-lg bg-red-500/10 blur-sm -z-10" />
                                        </motion.div>

                                        <div>
                                            <GlowText className="text-sm font-medium" intensity="low">
                                                Challenge #{index + 1}
                                            </GlowText>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="w-2 h-0.5 bg-red-400/60 rounded-full" />
                                                <span className="text-xs text-white/40">
                                                    {expandedChallenges[index] ? 'Expanded' : 'Click to expand'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Animated Chevron */}
                                    <motion.div
                                        className="flex items-center gap-2"
                                        animate={{
                                            rotate: expandedChallenges[index] ? 180 : 0,
                                            scale: expandedChallenges[index] ? 1.1 : 1
                                        }}
                                        transition={{
                                            duration: 0.4,
                                            type: "spring",
                                            stiffness: 200
                                        }}
                                    >
                                        <div className="w-6 h-6 rounded-md bg-[var(--highlight-color)]/10 flex items-center justify-center">
                                            <Icons name="ChevronDown" className="w-3 h-3" />
                                        </div>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Expandable Content */}
                            <AnimatePresence>
                                {expandedChallenges[index] && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{
                                            duration: 0.4,
                                            ease: [0.4, 0, 0.2, 1]
                                        }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-4 pb-4">
                                            {/* Divider */}
                                            <div className="h-px bg-gradient-to-r from-transparent via-[var(--highlight-color)]/30 to-transparent mb-4" />

                                            <div className="space-y-4">
                                                {/* Challenge Description */}
                                                <motion.div
                                                    initial={{ x: -20, opacity: 0 }}
                                                    animate={{ x: 0, opacity: 1 }}
                                                    transition={{ delay: 0.1, duration: 0.3 }}
                                                    className="relative"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className="flex-shrink-0 mt-1">
                                                            <div className="w-6 h-6 rounded-md bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                                                                <Icons name="AlertCircle" className="w-3 h-3 text-red-400" />
                                                            </div>
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <GlowText className="text-sm font-medium text-red-300" intensity="low">
                                                                    Problem
                                                                </GlowText>
                                                                <div className="flex-1 h-px bg-gradient-to-r from-red-500/30 to-transparent" />
                                                            </div>
                                                            <p className="text-white/80 text-sm leading-relaxed pl-3 border-l-2 border-red-400/20">
                                                                {challenge}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </motion.div>

                                                {/* Solution Description */}
                                                {solutions[index] && (
                                                    <motion.div
                                                        initial={{ x: -20, opacity: 0 }}
                                                        animate={{ x: 0, opacity: 1 }}
                                                        transition={{ delay: 0.2, duration: 0.3 }}
                                                        className="relative"
                                                    >
                                                        <div className="flex items-start gap-3">
                                                            <div className="flex-shrink-0 mt-1">
                                                                <div className="w-6 h-6 rounded-md bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                                                                    <Icons name="CheckCircle" className="w-3 h-3 text-green-400" />
                                                                </div>
                                                            </div>
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <GlowText className="text-sm font-medium text-green-300" intensity="low">
                                                                        Solution
                                                                    </GlowText>
                                                                    <div className="flex-1 h-px bg-gradient-to-r from-green-500/30 to-transparent" />
                                                                </div>
                                                                <p className="text-white/80 text-sm leading-relaxed pl-3 border-l-2 border-green-400/20">
                                                                    {solutions[index]}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}

                                                {/* Status Indicator */}
                                                <motion.div
                                                    initial={{ y: 10, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    transition={{ delay: 0.3, duration: 0.3 }}
                                                    className="flex items-center justify-center pt-2"
                                                >
                                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                                                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                                        <span className="text-xs text-green-300 font-medium">Resolved</span>
                                                    </div>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Connecting line to next challenge (except for last one) */}
                        {index < challenges.length - 1 && (
                            <motion.div
                                className="flex justify-center py-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: (index + 1) * 0.15 + 0.2 }}
                            >
                                <div className="w-px h-4 bg-gradient-to-b from-[var(--highlight-color)]/30 to-transparent" />
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>
        </>
    );
};

Challenges.propTypes = {
    challenges: PropTypes.arrayOf(PropTypes.string).isRequired,
    solutions: PropTypes.arrayOf(PropTypes.string).isRequired,
    expandedChallenges: PropTypes.object.isRequired,
    onToggleExpansion: PropTypes.func.isRequired
};

export default Challenges;