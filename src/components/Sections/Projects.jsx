// src/components/sections/Projects.jsx
import { useState } from 'react';
import SectionTitle from '../ui/SectionTitle';
import AnimatedSection from '../ui/AnimatedSection';
import ProjectCard from '../ui/ProjectCard';

// Project data with proper shape
const PROJECTS = [
  {
    title: "Dionamite",
    description: "A modern, responsive platform built with React.js and TailwindCSS. It highlights the company's services, showcases the portfolio, and includes a contact form with mailing functionality.",
    tags: ["ReactJs", "TailwindCSS"],
    image: "./dionamite.png",
    link: "https://dionamite.com/",
    github: null
  },
  {
    title: "Dionamite Academy",
    description: "A responsive task management application with drag-and-drop interface, team collaboration features, and real-time updates.",
    tags: ["ReactJs", "NodeJs", "MongoDB", "ExpressJs", "Tailwind CSS"],
    image: "./dionamiteacademy.png",
    link: "https://dionamite.academy/",
    github: null
  },
  {
    title: "Mr Wipe",
    description: "A cross-plataform mobile application for scheduling car cleaning services. Features a live map view, user authentication, and payment processing.",
    tags: ["React Native", "NodeJs", "MongoDB", "ExpressJs", "Tailwind CSS"],
    image: "../../api/placeholder/400/300",
    link: null,
    github: null
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

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);

  const handleMouseEnter = (index) => {
    setActiveProject(index);
  };

  const handleMouseLeave = () => {
    setActiveProject(null);
  };

  return (
    <AnimatedSection id="projects">
      {(inView) => (
        <>
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
        </>
      )}
    </AnimatedSection>
  );
};

export default Projects;