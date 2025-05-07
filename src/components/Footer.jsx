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
      <h2 className="text-3xl neon-text mb-8">Get In Touch</h2>
      
      <div className="max-w-2xl w-full mb-8">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block neon-text mb-2">Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full p-3 bg-white/5 border-2 border-white/20 rounded-lg focus:border-[var(--highlight-color)] text-white"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block neon-text mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full p-3 bg-white/5 border-2 border-white/20 rounded-lg focus:border-[var(--highlight-color)] text-white"
                placeholder="your.email@example.com"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="message" className="block neon-text mb-2">Message</label>
            <textarea 
              id="message" 
              rows="4" 
              className="w-full p-3 bg-white/5 border-2 border-white/20 rounded-lg focus:border-[var(--highlight-color)] text-white"
              placeholder="Your message here..."
            ></textarea>
          </div>
          
          <div>
            <button 
              type="submit" 
              className="px-6 py-3 bg-[var(--highlight-color)]/20 border-2 border-[var(--highlight-color)] rounded-lg neon-text-hover transition-all duration-300 hover:bg-[var(--highlight-color)]/30"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
      
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