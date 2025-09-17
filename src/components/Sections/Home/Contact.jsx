import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import SectionTitle from '../../ui/SectionTitle';
import Button from '../../ui/Button';
import AnimatedSection from '../../ui/AnimatedSection';
import GlowText from '../../ui/GlowText';
import { useToast, ToastPositions } from '../../../hooks/useToast';
import { TOAST_CONFIG } from '../../../constants';
import { CONTAINER_VARIANTS, ITEM_VARIANTS } from '../../../constants/animations';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const serviceId = import.meta.env.VITE_MAILER_SERVICE_ID;
  const templateId = import.meta.env.VITE_MAILER_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_MAILER_PUBLIC_KEY;
  
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    emailjs.init(publicKey);
  }, [publicKey]);

  const handleChange = {
    name: (e) => setName(e.target.value),
    email: (e) => setEmail(e.target.value),
    message: (e) => setMessage(e.target.value)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('Missing required EmailJS configuration values');
      }

      await emailjs.send(serviceId, templateId, { name, email, message }, publicKey);

      showSuccess('Message sent successfully!', {
        position: ToastPositions.TOP_RIGHT,
        duration: TOAST_CONFIG.SUCCESS_DURATION
      });

      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      showError(`Failed to send message: ${error.message || 'Please try again later'}`, {
        position: ToastPositions.TOP_RIGHT,
        duration: TOAST_CONFIG.ERROR_DURATION
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyles = "w-full p-3 rounded-md border-2 transition-all duration-200";
  const labelStyles = "block mb-2";
  const isFormValid = name.trim() && email.trim() && message.trim();

  return (
    <AnimatedSection id="contact" variant="fade">
      {(inView) => (
        <>
          <SectionTitle title="Get In Touch" inView={inView} />

          <motion.div 
            className="max-w-4xl w-full mx-auto mb-8"
            variants={CONTAINER_VARIANTS.stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <form className="space-y-6" onSubmit={handleSubmit} aria-label="Contact form">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={ITEM_VARIANTS.fadeInUp}
              >
                <div>
                  <label htmlFor="name" className={labelStyles}>
                    <GlowText>Name</GlowText>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleChange.name}
                    className={inputStyles}
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      borderColor: 'var(--border-primary)',
                      color: 'var(--text-primary)'
                    }}
                    placeholder="Your Name"
                    required
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelStyles}>
                    <GlowText>Email</GlowText>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange.email}
                    className={inputStyles}
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      borderColor: 'var(--border-primary)',
                      color: 'var(--text-primary)'
                    }}
                    placeholder="your.email@example.com"
                    required
                    aria-required="true"
                  />
                </div>
              </motion.div>

              <motion.div variants={ITEM_VARIANTS.fadeInUp}>
                <label htmlFor="message" className={labelStyles}>
                  <GlowText>Message</GlowText>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={handleChange.message}
                  rows="4"
                  className={inputStyles}
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border-primary)',
                    color: 'var(--text-primary)'
                  }}
                  placeholder="Your message here..."
                  required
                  aria-required="true"
                ></textarea>
              </motion.div>

              <motion.div variants={ITEM_VARIANTS.scaleIn}>
                <Button
                  type="submit"
                  variant="default"
                  loading={isSubmitting}
                  disabled={!isFormValid}
                  aria-label={isSubmitting ? "Sending message..." : "Send message"}
                >
                  Send Message
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatedSection>
  );
};

export default Contact;