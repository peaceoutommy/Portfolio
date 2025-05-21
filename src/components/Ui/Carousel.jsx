import { motion } from 'framer-motion';
import GlowContainer from '../ui/GlowContainer';

const Carousel = ({ images, activeImageIndex, setActiveImageIndex }) => {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <motion.div
      className="w-full mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <GlowContainer intensity="none" className="p-0 overflow-hidden">
        <div
          className="w-full relative flex"
          style={{
            transform: "skew(-10deg)",
            overflow: "hidden",
            height: "400px"
          }}
        >
          {images.map((img, index) => (
            <motion.div
              key={index}
              className="relative h-full overflow-hidden transition-all duration-500 ease-in-out"
              initial={{ flex: index === 0 ? 2 : 1 }}
              animate={{ 
                flex: activeImageIndex === index ? 2 : 1,
              }}
              whileHover={{
                flex: 2, // Slightly larger for better effect
                transition: { duration: 0.1 }
              }}
              onHoverStart={() => setActiveImageIndex(index)}
              onClick={() => setActiveImageIndex(index)} // Add click for mobile
              style={{
                marginRight: index < images.length - 1 ? "12px" : "0",
                zIndex: activeImageIndex === index ? 10 : 1,
                cursor: "pointer" // Show it's clickable
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-5%", // Add extra space at top
                  left: "-10%", // Add extra space at left
                  width: "150%", // Increased from 120% to ensure coverage
                  height: "110%", // Extra height to cover bottom
                  transform: "skew(10deg) translateX(-15%)", // Adjusted from -5%
                  backgroundImage: `url(/${img})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              ></div>
            </motion.div>
          ))}
        </div>
      </GlowContainer>
      
      {/* Add navigation indicators */}
      <div className="flex justify-center mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            className={`mx-1 h-1 rounded-full transition-all duration-300 ${
              activeImageIndex === index ? "w-6 bg-[var(--highlight-color)]" : "w-3 bg-gray-500"
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