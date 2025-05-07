import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const Footer = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const socialLinks = [
    { icon: "fab fa-github", url: "https://github.com/yourusername", label: "GitHub" },
    { icon: "fab fa-linkedin", url: "https://linkedin.com/in/yourusername", label: "LinkedIn" },
    { icon: "fab fa-twitter", url: "https://twitter.com/yourusername", label: "Twitter" },
    { icon: "fab fa-codepen", url: "https://codepen.io/yourusername", label: "CodePen" }
  ];

  return (
    <motion.footer 
      ref={ref}
      id="contact"
      className="w-full p-8 flex flex-col justify-center items-center neon-border md:mt-32 mt-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ duration: 0.3 }}
    >
      
      
      <div className="flex gap-6 mb-6">
        {socialLinks.map((link, index) => (
          <motion.a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="neon-text-hover text-2xl"
            aria-label={link.label}
            whileHover={{ y: -3, scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <i className={link.icon}></i>
          </motion.a>
        ))}
      </div>
      
      <div className="text-center">
        <p className="neon-text md:text-sm text-xs">© {new Date().getFullYear()} Your Name. All rights reserved.</p>
        <p className="neon-text mt-2 md:text-xs text-[10px] opacity-70">
          Built with React & Framer Motion
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;