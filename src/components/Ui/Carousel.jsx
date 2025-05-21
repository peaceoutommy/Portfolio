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
          className="w-full relative"
          style={{
            transform: "skew(-10deg)",
            overflow: "hidden",
            display: "flex",
            height: "400px"
          }}
        >
          {images.map((img, index) => (
            <motion.div
              key={index}
              className="relative h-full overflow-hidden transition-all duration-500 ease-in-out"
              initial={{ flex: index === 0 ? 2 : 1 }}
              animate={{ flex: activeImageIndex === index ? 2 : 1 }}
              whileHover={{
                flex: 2,
                transition: { duration: 0.3 }
              }}
              onHoverStart={() => setActiveImageIndex(index)}
              style={{
                marginRight: index < images.length - 1 ? "12px" : "0",
                zIndex: activeImageIndex === index ? 10 : 1
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "120%", // Slightly wider to account for skew
                  height: "100%",
                  transform: "skew(10deg) translateX(-5%)", // Counter-skew to make image appear normal
                  backgroundImage: `url(/${img})`,
                  backgroundSize: "cover",
                   backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  transition: "all 0.5s ease-in-out"
                }}
              ></div>
            </motion.div>
          ))}
        </div>
      </GlowContainer>
    </motion.div>
  );
};

export default Carousel;