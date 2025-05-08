// src/components/ui/ProjectCard.jsx
import { memo } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import Card from './Card';
import GlowText from './GlowText';

/**
 * ProjectCard - A standardized project card component for the portfolio
 */
const ProjectCard = ({ project, index, isActive, onMouseEnter, onMouseLeave, inView }) => {
  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={onMouseLeave}
    >
      <Card
        className="h-full flex flex-col"
        isActive={isActive}
        whileHover={{ y: -5 }}
        intensity={isActive ? "high" : "medium"}
      >
        <div className="relative overflow-hidden aspect-video">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
            style={{
              transform: isActive ? 'scale(1.05)' : 'scale(1)'
            }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300"
            style={{
              opacity: isActive ? 1 : 0.7
            }}
          />
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <GlowText as="h3" className="text-xl mb-3" intensity={isActive ? "high" : "medium"}>
            {project.title}
          </GlowText>
          <p className="mb-4 text-white/80">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-3 py-1 rounded-full text-xs bg-[var(--highlight-color)]/20 border border-[var(--highlight-color)]/30"
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
              >
                <GlowText hover intensity="medium">
                  <i className="fab fa-github mr-2"></i>
                  Code
                </GlowText>
              </a>
            ) : (
              <button
                className="px-4 py-2 rounded-lg border border-gray-500/50 text-gray-400 text-sm cursor-not-allowed opacity-60"
                disabled
                aria-label="Code not available"
              >
                <i className="fab fa-github mr-2"></i>
                Code
              </button>
            )}

            {project.link && project.link !== null && project.link !== "#" ? (
              <a
                href={project.link}
                className="px-4 py-2 rounded-lg bg-[var(--highlight-color)]/20 border border-[var(--highlight-color)]/50 transition-all duration-300 hover:bg-[var(--highlight-color)]/30 text-sm"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View live demo for ${project.title}`}
              >
                <GlowText hover intensity="medium">
                  <i className="fas fa-external-link-alt mr-2"></i>
                  Live Demo
                </GlowText>
              </a>
            ) : (
              <button
                className="px-4 py-2 rounded-lg border border-gray-500/50 text-gray-400 text-sm cursor-not-allowed opacity-60"
                disabled
                aria-label="Live demo not available"
              >
                <i className="fas fa-external-link-alt mr-2"></i>
                Live Demo
              </button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    image: PropTypes.string.isRequired,
    link: PropTypes.string,
    github: PropTypes.string
  }).isRequired,
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  inView: PropTypes.bool.isRequired
};

export default memo(ProjectCard);