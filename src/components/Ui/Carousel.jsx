import { motion } from 'framer-motion';
import Card from '../ui/Card';

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

      <div className="flex justify-center mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            className={`mx-1 h-1 rounded-full transition-all duration-300 ${activeImageIndex === index ? "w-6 bg-[var(--highlight-color)]" : "w-3 bg-gray-500" }`}
            onClick={() => setActiveImageIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Carousel;