// src/components/sections/Projects.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';
import SectionTitle from '../ui/SectionTitle';
import Card from '../ui/Card';

// Project data with proper shape
const PROJECTS = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce platform with React, Node.js, and MongoDB. Features include user authentication, product search, cart management, and payment processing.",
    tags: ["React", "Node.js", "MongoDB", "Stripe API"],
    image: "/api/placeholder/400/300",
    link: "#",
    github: "#"
  },
  {
    title: "Task Management App",
    description: "A responsive task management application with drag-and-drop interface, team collaboration features, and real-time updates.",
    tags: ["Vue.js", "Firebase", "Tailwind CSS"],
    image: "/api/placeholder/400/300",
    link: "#",
    github: "#"
  },
  {
    title: "Weather Dashboard",
    description: "An interactive weather dashboard that displays current and forecast weather data for multiple locations with customizable views.",
    tags: ["React", "OpenWeather API", "Chart.js"],
    image: "/api/placeholder/400/300",
    link: "#",
    github: "#"
  },
  {
    title: "Community Blog Platform",
    description: "A full-featured blog platform with rich text editing, comments, user profiles, and content moderation capabilities.",
    tags: ["Next.js", "PostgreSQL", "AWS S3"],
    image: "/api/placeholder/400/300",
    link: "#",
    github: "#"
  }
];

// ProjectCard component for better separation of concerns
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
        style={{
          boxShadow: isActive 
            ? `0 0 15px rgba(var(--highlight-rgb), 0.5)` 
            : `0 0 5px rgba(var(--highlight-rgb), 0.1)`
        }}
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
          <h3 className="text-xl neon-text mb-3">{project.title}</h3>
          <p className="mb-4 text-white/80">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, tagIndex) => (
              <span 
                key={tagIndex} 
                className="px-3 py-1 rounded-full text-xs bg-[var(--highlight-color)]/20 border border-[var(--highlight-color)]/30"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex gap-4 mt-auto">
            <a 
              href={project.github}
              className="px-4 py-2 rounded-lg border border-[var(--highlight-color)]/50 neon-text-hover text-sm transition-all duration-300 hover:bg-[var(--highlight-color)]/10"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View code for ${project.title}`}
            >
              <i className="fab fa-github mr-2"></i>
              Code
            </a>
            <a 
              href={project.link}
              className="px-4 py-2 rounded-lg bg-[var(--highlight-color)]/20 border border-[var(--highlight-color)]/50 neon-text-hover text-sm transition-all duration-300 hover:bg-[var(--highlight-color)]/30"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live demo for ${project.title}`}
            >
              <i className="fas fa-external-link-alt mr-2"></i>
              Live Demo
            </a>
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
    link: PropTypes.string.isRequired,
    github: PropTypes.string.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  inView: PropTypes.bool.isRequired
};

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const handleMouseEnter = (index) => {
    setActiveProject(index);
  };

  const handleMouseLeave = () => {
    setActiveProject(null);
  };

  return (
    <motion.section
      ref={ref}
      className="w-full md:mt-48 mt-32"
      id="projects"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ duration: 0.3 }}
    >
      <SectionTitle title="My Projects" inView={inView} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            index={index}
            isActive={activeProject === index}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            inView={inView}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default Projects;