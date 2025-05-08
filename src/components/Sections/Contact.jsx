import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import SectionTitle from '../ui/SectionTitle';
import Button from '../ui/Button';
import { useToast, ToastPositions, ToastTypes } from '../../hooks/useToast';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const serviceId = import.meta.env.VITE_MAILER_SERVICE_ID;
  const templateId = import.meta.env.VITE_MAILER_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_MAILER_PUBLIC_KEY;
  
  // Use the refactored toast hook with position and duration options
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    emailjs.init(publicKey);
  }, [publicKey]);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Using object shorthand for handlers
  const handleChange = {
    name: (e) => setName(e.target.value),
    email: (e) => setEmail(e.target.value),
    message: (e) => setMessage(e.target.value)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate configuration
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('Missing required EmailJS configuration values');
      }

      // Send email
      await emailjs.send(
        serviceId,
        templateId,
        { name, email, message },
        publicKey
      );

      showSuccess('Message sent successfully!', {
        position: ToastPositions.TOP_RIGHT,
        duration: 4000
      });

      // Reset form
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      showError(`Failed to send message: ${error.message || 'Please try again later'}`, {
        position: ToastPositions.TOP_RIGHT,
        duration: 4000 
      });
    } finally {
      setIsSubmitting(false);
    }
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
                value={name}
                onChange={handleChange.name}
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
                value={email}
                onChange={handleChange.email}
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
              value={message}
              onChange={handleChange.message}
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
          </div>
        </form>
      </div>
    </motion.section>
  );
};

export default Contact;