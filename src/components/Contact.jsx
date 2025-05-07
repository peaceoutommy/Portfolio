import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
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
        subject: '',
        message: ''
      });
      
      // Clear success message after delay
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 1500);
  };

  return (
    <motion.section
      ref={ref}
      id="contact"
      className="md:mt-48 mt-32 mb-16 "
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
    </motion.section>
  );
};

export default Contact;