import { Link } from 'react-router-dom';
import { memo } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import Card from './Card';
import GlowText from './GlowText';
import Icons from './Icons';

/**
 * ProjectCard - A standardized project card component for the portfolio
 * With device-specific behavior:
 * - Desktop: Hover-activated only
 * - Mobile: Scroll-activated only
 */
const ProjectCard = ({
  project,
  index,
  isActive,
  onMouseEnter,
  onMouseLeave,
  inView,
  isMobile = false
}) => {
  // Animation variants for smooth transitions
  const cardVariants = {
    active: {
      y: -5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.4
      }
    },
    inactive: {
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.4
      }
    }
  };

  // Only apply hover animation on desktop
  const hoverAnimation = isMobile ? undefined : { y: -5 };

  return (
    <motion.div
      className="h-full"
      // initial={{ opacity: 0, y: 20 }}
      // animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      // transition={{ duration: 0.3, delay: index * 0.1 }}
      // onMouseEnter={onMouseEnter}
      // onMouseLeave={onMouseLeave}
    >
      <Link to={`/project/${project.id}`}>
        <motion.div
          className="h-full"
          variants={cardVariants}
          initial="inactive"
          animate={isActive ? "active" : "inactive"}
        >
          <Card
            className="h-full flex flex-col overflow-hidden"
            isActive={isActive}
            whileHover={hoverAnimation}
            intensity={isActive ? "medium" : "none"}
          >
            <div className="relative overflow-hidden w-full">
              {/* Apply specific rounded corners only to the top of the image container */}
              <div className="relative aspect-video overflow-hidden rounded-t-lg">
                <motion.img
                  src={project.cover}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  initial={false}
                  animate={{
                    scale: isActive ? 1.03 : 1
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0.7
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <GlowText as="h3" className="text-xl mb-3" intensity={isActive ? "medium" : "low"}>
                {project.title}
              </GlowText>
              <p className="mb-4 text-base">{project.short}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 rounded-full text-xs bg-[var(--highlight-color)]/20 border border-[var(--highlight-color)]/30 transition-all duration-300"
                    style={{ borderColor: 'rgba(var(--highlight-rgb), 0.3)' }}
                  >
                    <GlowText intensity="low">{tag}</GlowText>
                  </span>
                ))}
              </div>

              <div className="flex gap-4 mt-auto">
                {project.github && project.github !== null && project.github !== "#" ? (
                  <a
                    href={project.github}
                    className="px-4 py-2 rounded-lg border border-[var(--highlight-color)]/50 transition-all duration-300 hover:bg-[var(--highlight-color)]/10 text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View code for ${project.title}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <GlowText hover intensity="low">
                      <div className='flex items-center gap-2'>
                        <Icons name="GitHub" />
                        <span>Code</span>
                      </div>
                    </GlowText>
                  </a>
                ) : (
                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-white/20 hover:border-white/30 duration-300 text-gray-400 text-xs cursor-not-allowed opacity-60"
                    disabled
                    aria-label="Code not available"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Icons name="GitHub" />
                    <span>Code</span>
                  </button>
                )}

                {project.link && project.link !== null && project.link !== "#" ? (
                  <a
                    href={project.link}
                    className="px-4 py-2 rounded-lg border-2 border-white/20 hover:border-white/30 duration-300 transition-all text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View live demo for ${project.title}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <GlowText hover intensity="low">
                      <div className='flex items-center gap-2'>
                        <Icons name='ExternalLink' />
                        <span>Live Demo</span>
                      </div>
                    </GlowText>
                  </a>
                ) : (
                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-white/20 hover:border-white/30 duration-300 text-gray-400 text-xs cursor-not-allowed opacity-60"
                    disabled
                    aria-label="Live demo not available"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Icons name='ExternalLink' />
                    <span>Live Demo</span>
                  </button>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      </Link>
    </motion.div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    short: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    cover: PropTypes.string.isRequired,
    link: PropTypes.string,
    github: PropTypes.string
  }).isRequired,
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  inView: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool
};

export default memo(ProjectCard);