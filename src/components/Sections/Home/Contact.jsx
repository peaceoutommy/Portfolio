import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import SectionTitle from '../../ui/SectionTitle';
import Button from '../../ui/Button';
import AnimatedSection from '../../ui/AnimatedSection';
import GlowText from '../../ui/GlowText';
import { useToast, ToastPositions } from '../../../hooks/useToast';
import { TOAST_CONFIG } from '../../../constants';

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
        duration: TOAST_CONFIG.SUCCESS_DURATION
      });

      // Reset form
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

  // Input styles - standardized
  const inputStyles = "w-full p-3 bg-white/5 border-2 border-white/20 rounded-lg focus:border-[var(--highlight-color)] text-white transition-all duration-300";
  const labelStyles = "block mb-2";

  // Check if form is valid
  const isFormValid = name.trim() && email.trim() && message.trim();

  return (
    <AnimatedSection id="contact">
      {(inView) => (
        <>
          <SectionTitle title="Get In Touch" inView={inView} />

          <div className="max-w-4xl w-full mx-auto mb-8">
            <form className="space-y-6" onSubmit={handleSubmit} aria-label="Contact form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    placeholder="your.email@example.com"
                    required
                    aria-required="true"
                  />
                </div>
              </div>

              <div>
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
                  placeholder="Your message here..."
                  required
                  aria-required="true"
                ></textarea>
              </div>

              <div>
                <Button
                  type="submit"
                  variant="primary"
                  loading={isSubmitting}
                  disabled={!isFormValid}
                  aria-label={isSubmitting ? "Sending message..." : "Send message"}
                >
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </>
      )}
    </AnimatedSection>
  );
};

export default Contact;