// src/components/sections/Contact.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      
      // Reset form after success
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      // Clear success message after delay
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 1500);
  };

  // Input styles
  const inputStyles = "w-full p-3 bg-white/5 border-2 border-white/20 rounded-lg focus:border-[var(--highlight-color)] text-white";
  const labelStyles = "block neon-text mb-2";

  return (
    <motion.section
      ref={ref}
      id="contact"
      className="md:mt-48 mt-32"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ duration: 0.3 }}
    >
      <SectionTitle title="Get In Touch" inView={inView} />
      
      <div className="max-w-2xl w-full mx-auto mb-8">
        <form className="space-y-6" onSubmit={handleSubmit} aria-label="Contact form">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className={labelStyles}>Name</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputStyles}
                placeholder="Your Name"
                required
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="email" className={labelStyles}>Email</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputStyles}
                placeholder="your.email@example.com"
                required
                aria-required="true"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="message" className={labelStyles}>Message</label>
            <textarea 
              id="message" 
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4" 
              className={inputStyles}
              placeholder="Your message here..."
              required
              aria-required="true"
            ></textarea>
          </div>
          
          <div>
            <Button 
              type="submit" 
              primary
              disabled={isSubmitting}
              aria-label={isSubmitting ? "Sending message..." : "Send message"}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
            
            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div 
                  className="mt-4 p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-300"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role="alert"
                >
                  Message sent successfully!
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </form>
      </div>
    </motion.section>
  );
};

export default Contact;