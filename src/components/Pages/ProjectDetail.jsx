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
import Carousel from '../ui/Carousel';
import ViewMore from '../ui/ViewMore';
import Challenges from '../Sections/ProjectDetails/Challenges';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [projectImages, setProjectImages] = useState([]);
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const [expandedChallenges, setExpandedChallenges] = useState({});

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

  const handleBackClick = () => {
    navigate('/');
    setTimeout(() => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const toggleChallengeExpansion = (index) => {
    setExpandedChallenges(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const developmentSteps = [
    {
      title: "Planning & Research",
      description: "Extensive research to understand requirements and identify the best technologies to use.",
      icon: "Search",
      details: "This included analyzing similar solutions and defining the scope of work."
    },
    {
      title: "Design & Prototyping",
      description: "Creating wireframes and interactive prototypes to visualize the user interface.",
      icon: "Palette",
      details: "This iterative process helped refine the design before any code was written."
    },
    {
      title: "Development",
      description: "Structured development approach with regular code reviews and testing.",
      icon: "Code",
      details: "The front-end was built using React with Tailwind CSS for styling, while the back-end utilized relevant technologies."
    },
    {
      title: "Testing & Deployment",
      description: "Rigorous testing ensured all features worked as expected across different environments.",
      icon: "CheckCircle",
      details: "After thorough quality assurance, the project was deployed to production with monitoring tools in place."
    }
  ];

  // ✅ FIXED: Use standardized Loading component
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
        className="mb-8"
      >
        <Button
          variant="outline"
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
            {/* ✅ FIXED: Use standardized Button component instead of custom implementation */}
            {project.github && project.github !== null && project.github !== "#" ? (
              <Button
                as="a"
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Icons name="GitHub" />
                <span>Code</span>
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                disabled
                className="flex items-center gap-2"
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
                variant="primary"
                size="sm"
                className="flex items-center gap-2"
              >
                <Icons name='ExternalLink' />
                <span>Live Demo</span>
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                disabled
                className="flex items-center gap-2"
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
                className="text-white/80"
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
                      collapsedText={"View more"}
                      intensity="medium"
                      ariaLabel={expandedDescription ? "Collapse project description" : "Expand project description"}
                    />
                  </div>
                )}
              </motion.div>
            </Card>
          </motion.div>

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
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <GlowText intensity={isHovered('features') ? 'medium' : 'low'}>
                      <Icons name="CheckCircle" />
                    </GlowText>
                    <span className="text-white/80 text-sm">{feature}</span>
                  </motion.div>
                )))}
            </Card>
          </motion.div>

          {/* Development Process - Interactive Timeline */}
          <motion.div
            variants={CARD_VARIANTS.hover}
            initial="inactive"
            animate={isHovered('process') ? "active" : "inactive"}
          >
            <Card
              className="p-6 mb-8"
              isActive={isHovered('process')}
              intensity={isHovered('process') ? 'medium' : 'none'}
              onMouseEnter={() => handleMouseEnter('process')}
              onMouseLeave={handleMouseLeave}
            >
              <GlowText as="h2" className="text-xl mb-6" intensity={isHovered('process') ? "medium" : "low"}>
                Development Process
              </GlowText>
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {developmentSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    className={`relative p-4 rounded-lg border transition-all duration-300 cursor-pointer ${activeProcessStep === index
                      ? 'border-[var(--highlight-color)]/50 bg-[var(--highlight-color)]/5'
                      : 'border-[var(--highlight-color)]/20 hover:border-[var(--highlight-color)]/40'
                      }`}
                    onClick={() => setActiveProcessStep(activeProcessStep === index ? -1 : index)}
                    whileHover={{ scale: 1.01 }}
                    layoutId={`process-${index}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${activeProcessStep === index
                        ? 'bg-[var(--highlight-color)]/20'
                        : 'bg-[var(--highlight-color)]/10'
                        }`}>
                        <Icons name={step.icon} />
                      </div>
                      <div className="flex-1">
                        <GlowText as="h3" className="text-lg mb-1" intensity={isHovered('process') ? "medium" : "low"}>
                          {index + 1}. {step.title}
                        </GlowText>
                        <p className="text-white/70 text-sm">{step.description}</p>
                      </div>
                      <motion.div
                        animate={{ rotate: activeProcessStep === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Icons name="ChevronDown" />
                      </motion.div>
                    </div>
                    <AnimatePresence>
                      {activeProcessStep === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden mt-4 pt-4 border-t border-[var(--highlight-color)]/20"
                        >
                          <p className="text-white/80 text-sm">{step.details}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
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
          {/* Challenges & Solutions Component */}
          <Challenges
            challenges={project.challenges}
            solutions={project.solutions}
            expandedChallenges={expandedChallenges}
            onToggleExpansion={toggleChallengeExpansion}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;