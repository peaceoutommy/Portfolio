import { motion } from 'framer-motion';
import { useState } from 'react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { useMobileDetection } from '../../../hooks/useMobileDetection';

const Carousel = ({ images, activeImageIndex, setActiveImageIndex }) => {
  const [dragStart, setDragStart] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const isMobile = useMobileDetection(768);

  if (!images || images.length === 0) {
    return null;
  }

  const handleDragStart = (event, info) => {
    setDragStart(info.point.x);
    setIsDragging(true);
  };

  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    const dragDistance = info.point.x - dragStart;
    const threshold = 50;

    if (Math.abs(dragDistance) > threshold) {
      if (dragDistance > 0 && activeImageIndex > 0) {
        // Swipe right - go to previous image
        setActiveImageIndex(activeImageIndex - 1);
      } else if (dragDistance < 0 && activeImageIndex < images.length - 1) {
        // Swipe left - go to next image
        setActiveImageIndex(activeImageIndex + 1);
      }
    }
  };

  if (isMobile) {
    return (
      <motion.div
        className="w-full mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card
          intensity="none"
          className="p-0 overflow-hidden"
          whileHover={{}} // Disable Card's default hover effect by passing empty object
        >
          <motion.div
            className="w-full relative"
            style={{
              overflow: "hidden",
              height: "300px"
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            whileDrag={{ cursor: "grabbing" }}
          >
            <motion.div
              className="flex h-full"
              animate={{
                x: -activeImageIndex * 100 + "%"
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
            >
              {images.map((img, index) => (
                <div
                  key={index}
                  className="w-full h-full flex-shrink-0 relative"
                  style={{
                    backgroundImage: `url(/${img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </Card>

        {/* Mobile navigation arrows */}
        {images.length > 1 && (
          <div className="flex justify-between items-center mt-4 px-4">
            <button
              className={`p-2 rounded-full transition-all duration-300 ${activeImageIndex === 0
                ? "opacity-50 cursor-not-allowed"
                : "opacity-100 hover:bg-white/10"
                }`}
              onClick={() => activeImageIndex > 0 && setActiveImageIndex(activeImageIndex - 1)}
              disabled={activeImageIndex === 0}
              aria-label="Previous image"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <span className="text-sm" style={{ color: 'var(--highlight-color)' }}>
              {activeImageIndex + 1} <span className="text-sm text-white/70">/ {images.length}</span>
            </span>

            <button
              className={`p-2 rounded-full transition-all duration-300 ${activeImageIndex === images.length - 1
                ? "opacity-50 cursor-not-allowed"
                : "opacity-100 hover:bg-white/10"
                }`}
              onClick={() => activeImageIndex < images.length - 1 && setActiveImageIndex(activeImageIndex + 1)}
              disabled={activeImageIndex === images.length - 1}
              aria-label="Next image"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </motion.div>
    );
  }

  // Desktop layout - original expanding carousel
  return (
    <motion.div
      className="w-full mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Card
        intensity="none"
        className="p-0 overflow-hidden"
        whileHover={{}} // Disable Card's default hover effect by passing empty object
      >
        <div
          className="w-full relative flex"
          style={{
            overflow: "hidden",
            height: "400px"
          }}
        >
          {images.map((img, index) => (
            <motion.div
              key={index}
              className="relative h-full overflow-hidden transition-all duration-500 ease-in-out"
              initial={{ flex: index === 0 ? 3 : 1 }}
              animate={{
                flex: activeImageIndex === index ? 3 : 1,
              }}
              whileHover={{
                flex: 3,
                transition: { duration: 0.1 }
              }}
              onHoverStart={() => setActiveImageIndex(index)}
              onClick={() => setActiveImageIndex(index)}
              style={{
                marginRight: index < images.length - 1 ? "12px" : "0",
                cursor: "pointer",
              }}
            >
              <div
                className="absolute inset-0 transition-all duration-500 ease-in-out"
                style={{
                  backgroundImage: `url(/${img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  width: "100%",
                  height: "100%",
                  filter: activeImageIndex === index ? "brightness(1)" : "brightness(0.6)",
                }}
              />
            </motion.div>
          ))}
        </div>
      </Card>

      <div className="flex justify-center mt-4 gap-1">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-1 rounded-full transition-all duration-500 ${activeImageIndex === index
              ? "w-6 bg-[var(--highlight-color)]"
              : "w-3 bg-white/15 hover:bg-white/25"
              }`}
            onClick={() => setActiveImageIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Carousel;