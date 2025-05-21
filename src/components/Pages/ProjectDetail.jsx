import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GetProject } from '../../data/projectsData';
import GlowText from '../ui/GlowText';
import GlowContainer from '../ui/GlowContainer';
import Icons from '../ui/Icons';
import Carousel from '../Ui/Carousel'; 

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [projectImages, setProjectImages] = useState([]);

  useEffect(() => {
    const selectedProject = GetProject(projectId);

    if (selectedProject) {
      setProject(selectedProject);
      document.title = `${selectedProject.title} | Portfolio`;

      // Use the images array if available, otherwise use the cover image
      if (selectedProject.images && selectedProject.images.length > 0) {
        setProjectImages(selectedProject.images);
        console.log(selectedProject.images);
      } else {
        // Fallback to using cover image if no images array
        setProjectImages([selectedProject.cover]);
      }
    } else {
      handleBackClick();
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
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.98, 1.02, 0.98]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <GlowText intensity="high" className="text-xl">
            Loading Project...
          </GlowText>
        </motion.div>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <div className="min-h-screen pt-20 pb-16 mx-auto">
      {/* Back Button */}
      <motion.button
        onClick={handleBackClick}
        className="self-start mb-8 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-[var(--highlight-color)]/10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{
          x: -5,
          transition: { duration: 0.2 }
        }}
      >
        <GlowText hover intensity="medium">
          <div className="flex items-center gap-2">
            <Icons name="ChevronLeft" />
            <span>Back</span>
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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <GlowText as="h1" className="text-3xl md:text-4xl mb-4" intensity="medium">
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
          </div>

          <div className="flex gap-4">
            {project.github && project.github !== null && project.github !== "#" ? (
              <a
                href={project.github}
                className="px-4 py-2 rounded-lg border border-[var(--highlight-color)]/50 transition-all duration-300 hover:bg-[var(--highlight-color)]/10 text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GlowText hover intensity="medium">
                  <div className='flex items-center gap-2'>
                    <Icons name="GitHub" />
                    <span>Code</span>
                  </div>
                </GlowText>
              </a>
            ) : (
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-500/50 text-gray-400 text-sm cursor-not-allowed opacity-60"
                disabled
              >
                <Icons name="GitHub" />
                <span>Code</span>
              </button>
            )}

            {project.link && project.link !== null && project.link !== "#" ? (
              <a
                href={project.link}
                className="px-4 py-2 rounded-lg bg-[var(--highlight-color)]/20 border border-[var(--highlight-color)]/50 transition-all duration-300 hover:bg-[var(--highlight-color)]/30 text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GlowText hover intensity="medium">
                  <div className='flex items-center gap-2'>
                    <Icons name='ExternalLink' />
                    <span>Live Demo</span>
                  </div>
                </GlowText>
              </a>
            ) : (
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-500/50 text-gray-400 text-sm cursor-not-allowed opacity-60"
                disabled
              >
                <Icons name='ExternalLink' />
                <span>Live Demo</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>

      <Carousel 
        images={projectImages}
        activeImageIndex={activeImageIndex}
        setActiveImageIndex={setActiveImageIndex}
      />

      {/* Project Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content - 8 columns on large screens */}
        <motion.div
          className="lg:col-span-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {/* Project Overview */}
          <GlowContainer className="p-6 mb-8">
            <GlowText as="h2" className="text-xl mb-4" intensity="medium">
              Project Overview
            </GlowText>
            <motion.div
              className="text-white/80 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-4">{project.short}</p>
              <p className="mb-4">
                This project showcases my skills in {project.tags.join(', ')}.
                The development process involved careful planning, design, and implementation
                to create a solution that meets all requirements while providing an excellent user experience.
              </p>
            </motion.div>
          </GlowContainer>

          {/* Additional Project Details - Features */}
          <GlowContainer className="p-6 mb-8">
            <GlowText as="h2" className="text-xl mb-4" intensity="medium">
              Key Features
            </GlowText>
            <motion.ul
              className="space-y-4 text-white/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Use project.keyFeatures if available, otherwise show default features */}
              {project.keyFeatures && project.keyFeatures.length > 0 ? (
                project.keyFeatures.map((feature, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-[var(--highlight-color)]">
                      <Icons name="CheckCircle" />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))
              ) : (
                <>
                  <li className="flex gap-3">
                    <span className="text-[var(--highlight-color)]">
                      <Icons name="CheckCircle" />
                    </span>
                    <span>Responsive design that works seamlessly across all devices</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[var(--highlight-color)]">
                      <Icons name="CheckCircle" />
                    </span>
                    <span>Modern UI/UX principles with intuitive navigation</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[var(--highlight-color)]">
                      <Icons name="CheckCircle" />
                    </span>
                    <span>Efficient code structure with best practices</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[var(--highlight-color)]">
                      <Icons name="CheckCircle" />
                    </span>
                    <span>Optimized performance for smooth user experience</span>
                  </li>
                </>
              )}
            </motion.ul>
          </GlowContainer>

          {/* Development Process */}
          <GlowContainer className="p-6 mb-8">
            <GlowText as="h2" className="text-xl mb-4" intensity="medium">
              Development Process
            </GlowText>
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div>
                <GlowText as="h3" className="text-lg mb-2" intensity="low">
                  1. Planning & Research
                </GlowText>
                <p className="text-white/80">
                  The project began with extensive research to understand the requirements and identify the best technologies to use.
                  This included analyzing similar solutions and defining the scope of work.
                </p>
              </div>

              <div>
                <GlowText as="h3" className="text-lg mb-2" intensity="low">
                  2. Design & Prototyping
                </GlowText>
                <p className="text-white/80">
                  The design phase focused on creating wireframes and interactive prototypes to visualize the user interface and experience.
                  This iterative process helped refine the design before any code was written.
                </p>
              </div>

              <div>
                <GlowText as="h3" className="text-lg mb-2" intensity="low">
                  3. Development
                </GlowText>
                <p className="text-white/80">
                  Development followed a structured approach with regular code reviews and testing.
                  The front-end was built using React with Tailwind CSS for styling, while the back-end utilized [relevant technologies].
                </p>
              </div>

              <div>
                <GlowText as="h3" className="text-lg mb-2" intensity="low">
                  4. Testing & Deployment
                </GlowText>
                <p className="text-white/80">
                  Rigorous testing ensured all features worked as expected across different environments.
                  After thorough quality assurance, the project was deployed to production with monitoring tools in place.
                </p>
              </div>
            </motion.div>
          </GlowContainer>
        </motion.div>

        {/* Sidebar - 4 columns on large screens */}
        <motion.div
          className="lg:col-span-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {/* Project Metadata */}
          <GlowContainer className="p-6 mb-8">
            <GlowText as="h2" className="text-xl mb-4" intensity="medium">
              Project Details
            </GlowText>

            <div className="space-y-4">
              <div>
                <GlowText className="text-sm mb-1" intensity="low">Timeline</GlowText>
                <p className="text-white/80">Jan 2023 - Mar 2023</p>
              </div>

              <div>
                <GlowText className="text-sm mb-1" intensity="low">Role</GlowText>
                <p className="text-white/80">Full Stack Developer</p>
              </div>

              <div>
                <GlowText className="text-sm mb-1" intensity="low">Client</GlowText>
                <p className="text-white/80">Personal Project</p>
              </div>
            </div>
          </GlowContainer>

          {/* Challenges & Solutions */}
          <GlowContainer className="p-6 mb-8">
            <GlowText as="h2" className="text-xl mb-4" intensity="medium">
              Challenges & Solutions
            </GlowText>

            <div className="space-y-4 text-white/80">
              <div>
                <GlowText className="text-md mb-1" intensity="low">Challenge</GlowText>
                <p className="mb-2">Implementing real-time updates without affecting performance.</p>
                <GlowText className="text-md mb-1" intensity="low">Solution</GlowText>
                <p>Used WebSockets with optimized data transfer to ensure smooth updates with minimal latency.</p>
              </div>

              <div>
                <GlowText className="text-md mb-1" intensity="low">Challenge</GlowText>
                <p className="mb-2">Creating a responsive interface that works across all devices.</p>
                <GlowText className="text-md mb-1" intensity="low">Solution</GlowText>
                <p>Implemented a mobile-first design approach with Tailwind CSS and custom breakpoints.</p>
              </div>
            </div>
          </GlowContainer>

          {/* Call to Action */}
          <motion.div
            className="relative overflow-hidden rounded-lg border border-[var(--highlight-color)]/50 p-6"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-[var(--highlight-color)]/10 animate-pulse"></div>
            <div className="relative z-10">
              <GlowText as="h3" className="text-lg mb-3" intensity="medium">
                Interested in working together?
              </GlowText>
              <p className="text-white/80 mb-4">
                I'm always open to new opportunities and collaborations.
              </p>
              <a
                href="/contact"
                className="inline-block px-4 py-2 rounded-lg bg-[var(--highlight-color)]/20 border border-[var(--highlight-color)]/50 transition-all duration-300 hover:bg-[var(--highlight-color)]/30"
              >
                <GlowText hover intensity="medium">
                  <div className="flex items-center gap-2">
                    <Icons name="Mail" />
                    <span>Get in Touch</span>
                  </div>
                </GlowText>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;