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
      className="w-full md:mt-48 mt-32 mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-3xl neon-text text-center mb-12">Get In Touch</h2>
      
      <div className="max-w-4xl mx-auto">
        <div className="card p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <h3 className="text-xl neon-text mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--highlight-color)]/20 flex items-center justify-center">
                    <i className="fas fa-envelope neon-text"></i>
                  </div>
                  <div>
                    <h4 className="text-sm text-white/60">Email</h4>
                    <p className="neon-text">your.email@example.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--highlight-color)]/20 flex items-center justify-center">
                    <i className="fas fa-map-marker-alt neon-text"></i>
                  </div>
                  <div>
                    <h4 className="text-sm text-white/60">Location</h4>
                    <p className="neon-text">San Francisco, CA</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--highlight-color)]/20 flex items-center justify-center">
                    <i className="fas fa-globe neon-text"></i>
                  </div>
                  <div>
                    <h4 className="text-sm text-white/60">Website</h4>
                    <p className="neon-text">www.yourportfolio.com</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-6">
                <h4 className="mb-4 neon-text">Connect With Me</h4>
                <div className="flex gap-4">
                  <a 
                    href="https://github.com/yourusername" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[var(--highlight-color)]/20 flex items-center justify-center neon-text-hover transition-all duration-300 hover:bg-[var(--highlight-color)]/40"
                    aria-label="GitHub"
                  >
                    <i className="fab fa-github"></i>
                  </a>
                  <a 
                    href="https://linkedin.com/in/yourusername" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[var(--highlight-color)]/20 flex items-center justify-center neon-text-hover transition-all duration-300 hover:bg-[var(--highlight-color)]/40"
                    aria-label="LinkedIn"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a 
                    href="https://twitter.com/yourusername" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[var(--highlight-color)]/20 flex items-center justify-center neon-text-hover transition-all duration-300 hover:bg-[var(--highlight-color)]/40"
                    aria-label="Twitter"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a 
                    href="https://instagram.com/yourusername" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[var(--highlight-color)]/20 flex items-center justify-center neon-text-hover transition-all duration-300 hover:bg-[var(--highlight-color)]/40"
                    aria-label="Instagram"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <h3 className="text-xl neon-text mb-6">Send Me a Message</h3>
              
              {submitStatus === 'success' && (
                <motion.div 
                  className="mb-6 p-4 border border-[var(--highlight-color)] bg-[var(--highlight-color)]/10 rounded-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="neon-text text-sm">Message sent successfully! I'll get back to you soon.</p>
                </motion.div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 bg-black/30 border border-white/20 rounded-lg focus:border-[var(--highlight-color)] text-white text-sm"
                    placeholder="Your Name"
                    required
                  />
                </div>
                
                <div>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 bg-black/30 border border-white/20 rounded-lg focus:border-[var(--highlight-color)] text-white text-sm"
                    placeholder="Your Email"
                    required
                  />
                </div>
                
                <div>
                  <input 
                    type="text" 
                    name="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-3 bg-black/30 border border-white/20 rounded-lg focus:border-[var(--highlight-color)] text-white text-sm"
                    placeholder="Subject"
                    required
                  />
                </div>
                
                <div>
                  <textarea 
                    name="message" 
                    rows="4" 
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-3 bg-black/30 border border-white/20 rounded-lg focus:border-[var(--highlight-color)] text-white text-sm"
                    placeholder="Your message here..."
                    required
                  ></textarea>
                </div>
                
                <div>
                  <button 
                    type="submit" 
                    className="w-full px-6 py-3 bg-[var(--highlight-color)]/20 border border-[var(--highlight-color)] rounded-lg neon-text-hover transition-all duration-300 hover:bg-[var(--highlight-color)]/30 disabled:opacity-50 text-sm"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;