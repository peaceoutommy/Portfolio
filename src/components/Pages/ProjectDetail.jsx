// src/components/Pages/ProjectDetail.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GetProjects } from '../../data/projectsData';
import Navbar from '../Navbar';
import Footer from '../Footer';
import AnimatedBackground from '../AnimatedBackground';
import GlowText from '../ui/GlowText';
import GlowContainer from '../ui/GlowContainer';
import Icons from '../ui/Icons';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { ToastProvider } from '../../contexts/ToastContext';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const projects = GetProjects();

    const selectedProject = projects[parseInt(projectId)];

    if (selectedProject) {
      setProject(selectedProject);
      document.title = `${selectedProject.title} | Portfolio`;
    } else {
      // Project not found, redirect to projects page
      navigate('/#projects');
    }

    setLoading(false);
  }, [projectId, navigate]);

  // Handle back button click
  const handleBackClick = () => {
    navigate('/');
    // Scroll to projects section after a short delay
    setTimeout(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  if (loading) {
    return (
      <ThemeProvider>
        <ToastProvider>
          <div className="min-h-screen flex flex-col">
            <AnimatedBackground />
            <Navbar />
            <main className="flex-grow flex items-center justify-center">
              <div className="loading-spinner">
                <GlowText intensity="high">Loading...</GlowText>
              </div>
            </main>
            <Footer />
          </div>
        </ToastProvider>
      </ThemeProvider>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <>
      <motion.button
        onClick={handleBackClick}
        className="self-start mb-8 px-4 py-2 rounded-lg border border-[var(--highlight-color)]/50 transition-all duration-300 hover:bg-[var(--highlight-color)]/10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <GlowText hover intensity="medium">
          <div className="flex items-center gap-2">
            <Icons name="ChevronLeft" />
            <span>Back to Projects</span>
          </div>
        </GlowText>
      </motion.button>

      {/* Project header */}
      <motion.div
        className="w-full mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <GlowText as="h1" className="text-3xl md:text-4xl mb-4" intensity="high">
          {project.title}
        </GlowText>

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
      </motion.div>

      {/* Project image */}
      <motion.div
        className="w-full mb-8 overflow-hidden rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <GlowContainer intensity="medium" className="p-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-auto object-cover"
          />
        </GlowContainer>
      </motion.div>

      {/* Project details */}
      <motion.div
        className="w-full grid grid-cols-1 md:grid-cols-3 gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {/* Left column - Description */}
        <div className="md:col-span-2">
          <GlowContainer className="p-6">
            <GlowText as="h2" className="text-xl mb-4" intensity="medium">
              Project Overview
            </GlowText>
            <p className="text-white/80 mb-6">
              {project.description}
            </p>

            {/* Additional project details would go here */}
            <p className="text-white/80 mb-6">
              This project showcases my skills in {project.tags.join(', ')}.
              The development process involved careful planning, design, and implementation
              to create a solution that meets all requirements while providing an excellent user experience.
            </p>

            <p className="text-white/80">
              Key features include responsive design, modern UI/UX principles, and efficient code structure.
              The project demonstrates my ability to create professional, production-ready applications.
            </p>
          </GlowContainer>
        </div>

        {/* Right column - Links and details */}
        <div>
          <GlowContainer className="p-6 mb-8">
            <GlowText as="h2" className="text-xl mb-4" intensity="medium">
              Project Links
            </GlowText>

            <div className="flex flex-col gap-4">
              {project.github && project.github !== null && project.github !== "#" ? (
                <a
                  href={project.github}
                  className="px-4 py-3 rounded-lg border border-[var(--highlight-color)]/50 transition-all duration-300 hover:bg-[var(--highlight-color)]/10 text-sm w-full"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GlowText hover intensity="medium">
                    <div className="flex items-center gap-2">
                      <Icons name="GitHub" />
                      <span>View Source Code</span>
                    </div>
                  </GlowText>
                </a>
              ) : (
                <button
                  className="flex items-center gap-2 px-4 py-3 rounded-lg border border-gray-500/50 text-gray-400 text-sm cursor-not-allowed opacity-60 w-full"
                  disabled
                >
                  <Icons name="GitHub" />
                  <span>Source Code Not Available</span>
                </button>
              )}

              {project.link && project.link !== null && project.link !== "#" ? (
                <a
                  href={project.link}
                  className="px-4 py-3 rounded-lg bg-[var(--highlight-color)]/20 border border-[var(--highlight-color)]/50 transition-all duration-300 hover:bg-[var(--highlight-color)]/30 text-sm w-full"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GlowText hover intensity="medium">
                    <div className="flex items-center gap-2">
                      <Icons name="ExternalLink" />
                      <span>Visit Live Project</span>
                    </div>
                  </GlowText>
                </a>
              ) : (
                <button
                  className="flex items-center gap-2 px-4 py-3 rounded-lg border border-gray-500/50 text-gray-400 text-sm cursor-not-allowed opacity-60 w-full"
                  disabled
                >
                  <Icons name="ExternalLink" />
                  <span>Live Demo Not Available</span>
                </button>
              )}
            </div>
          </GlowContainer>

          <GlowContainer className="p-6">
            <GlowText as="h2" className="text-xl mb-4" intensity="medium">
              Technologies
            </GlowText>

            <ul className="space-y-2">
              {project.tags.map((tag, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--highlight-color)]"></span>
                  <span className="text-white/80">{tag}</span>
                </li>
              ))}
            </ul>
          </GlowContainer>
        </div>
      </motion.div>
    </>
  );
};

export default ProjectDetail;
