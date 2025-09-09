import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GetProject } from '../../data/projectsData';
import { useHoverState } from '../../hooks/useHoverState';
import { CARD_VARIANTS, ITEM_VARIANTS } from '../../constants/animations';
import GlowText from '../ui/GlowText';
import Card from '../ui/Card';
import Icons from '../ui/Icons';
import Button from '../ui/Button';
import Loading from '../ui/Loading';
import Carousel from '../Sections/ProjectDetails/Carousel';
import ViewMore from '../ui/ViewMore';
import MainTakeaways from '../Sections/ProjectDetails/MainTakeaways';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [projectImages, setProjectImages] = useState([]);
  const [expandedDescription, setExpandedDescription] = useState(false);

  const { handleMouseEnter, handleMouseLeave, isHovered } = useHoverState();

  useEffect(() => {
    const selectedProject = GetProject(projectId);

    if (selectedProject) {
      setProject(selectedProject);
      document.title = `${selectedProject.title} | Portfolio`;

      if (selectedProject.images && selectedProject.images.length > 0) {
        setProjectImages(selectedProject.images);
        console.log(selectedProject.images);
      } else {
        setProjectImages([selectedProject.cover]);
      }
    } else {
      handleBackClick();
    }

    setLoading(false);
  }, [projectId, navigate]);

  // Scroll to top when component mounts or projectId changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  const handleBackClick = () => {
    navigate('/');
    setTimeout(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  if (loading) {
    return <Loading text="Loading Project..." fullScreen />;
  }

  if (!project) {
    return null;
  }

  return (
    <div className="min-h-screen pt-20 pb-16 mx-auto">
      {/* Back Button */}
      <motion.div
        variants={ITEM_VARIANTS.fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3 }}
        className="mb-8 mt-8 sm:mt-0"
      >
        <Button
          variant="default"
          size="sm"
          onClick={handleBackClick}
          className="flex items-center gap-2"
        >
          <Icons name="ChevronLeft" />
          <span>Back</span>
        </Button>
      </motion.div>

      {/* Project header */}
      <motion.div
        className="w-full mb-8"
        variants={ITEM_VARIANTS.fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <GlowText as="h1" className="text-3xl md:text-4xl mb-4" intensity="medium">
              {project.title}
            </GlowText>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, tagIndex) => (
                <motion.span
                  key={tagIndex}
                  className="px-3 py-1 rounded-full text-xs border border-[var(--highlight-color)]/30"
                  whileHover={{ scale: 1.05 }}
                  style={{ borderColor: 'rgba(var(--highlight-rgb), 0.3)' }}
                >
                  <GlowText intensity="low">{tag}</GlowText>
                </motion.span>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            {project.github && project.github !== null && project.github !== "#" ? (
              <Button
                as="a"
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                variant="default"
                size="sm"
                className="flex items-center gap-2"
              >
                <Icons name="GitHub" />
                <span>Code</span>
              </Button>
            ) : (
              <Button
                variant="default"
                size="sm"
                disabled
                className="flex items-center gap-2 text-gray-400"
              >
                <Icons name="GitHub" />
                <span>Code</span>
              </Button>
            )}

            {project.link && project.link !== null && project.link !== "#" ? (
              <Button
                as="a"
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                variant="default"
                size="sm"
                className="flex items-center gap-2"
              >
                <Icons name='ExternalLink' />
                <span>Live Demo</span>
              </Button>
            ) : (
              <Button
                variant="default"
                size="sm"
                disabled
                className="flex items-center gap-2 text-gray-400"
              >
                <Icons name='ExternalLink' />
                <span>Live Demo</span>
              </Button>
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
          variants={ITEM_VARIANTS.fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {/* Key Features */}
          <motion.div
            variants={CARD_VARIANTS.hover}
            initial="inactive"
            animate={isHovered('features') ? "active" : "inactive"}
          >
            <Card
              className="p-6 mb-8"
              isActive={isHovered('features')}
              intensity={isHovered('features') ? 'medium' : 'none'}
              onMouseEnter={() => handleMouseEnter('features')}
              onMouseLeave={handleMouseLeave}
            >
              <GlowText as="h2" className="text-xl mb-4" intensity={isHovered('features') ? "medium" : "low"}>
                Key Features
              </GlowText>

              {project.keyFeatures && project.keyFeatures.length > 0 && (
                project.keyFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex gap-3 p-3 rounded-lg"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                  >
                    <GlowText intensity={isHovered('features') ? 'medium' : 'low'}>
                      <Icons name="CheckCircle" />
                    </GlowText>
                    <span className="text-base">{feature}</span>
                  </motion.div>
                )))}
            </Card>
          </motion.div>

          {/* Project Overview - Expandable Card */}
          <motion.div
            variants={CARD_VARIANTS.hover}
            initial="inactive"
            animate={isHovered('overview') ? "active" : "inactive"}
          >
            <Card
              className="p-6 mb-8"
              isActive={isHovered('overview')}
              intensity={isHovered('overview') ? 'medium' : 'none'}
              onMouseEnter={() => handleMouseEnter('overview')}
              onMouseLeave={handleMouseLeave}
            >
              <GlowText as="h2" className="text-xl mb-4" intensity={isHovered('overview') ? "medium" : "low"}>
                Project Overview
              </GlowText>

              <motion.div
                className="text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Show first paragraph always */}
                <p className="mb-4">{project.description[0]}</p>

                {/* Show remaining paragraphs when expanded */}
                <AnimatePresence>
                  {expandedDescription && project.description.length > 1 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      {project.description.slice(1).map((desc, i) => (
                        <motion.p
                          key={i}
                          className="mb-4"
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          {desc}
                        </motion.p>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {project.description.length > 1 && (
                  <div className="flex justify-center mt-6">
                    <ViewMore
                      isExpanded={expandedDescription}
                      onClick={() => setExpandedDescription(!expandedDescription)}
                      expandedText="Show Less"
                      collapsedText={"Show more"}
                      intensity="medium"
                      ariaLabel={expandedDescription ? "Collapse project description" : "Expand project description"}
                    />
                  </div>
                )}
              </motion.div>
            </Card>
          </motion.div>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          className="lg:col-span-4"
          variants={ITEM_VARIANTS.fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {/* Main Takeaways Component */}
          <MainTakeaways
            takeaways={project.takeaways}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;