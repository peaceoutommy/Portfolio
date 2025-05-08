// src/hooks/useTypewriter.js
import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for typewriter text effects
 * 
 * @param {string} text - The text to display with typewriter effect
 * @param {Object} options - Configuration options
 * @param {number} options.typingSpeed - Speed of typing in ms per character (default: 70)
 * @param {number} options.startDelay - Delay before typing starts in ms (default: 300)
 * @param {boolean} options.startTyping - Whether to start typing immediately (default: true)
 * @param {Function} options.onComplete - Callback to run when typing completes
 * @returns {Object} - Contains the displayedText, isTyping state, and isComplete state
 */
export const useTypewriter = (text, options = {}) => {
  const {
    typingSpeed = 70,
    startDelay = 300,
    startTyping = true,
    onComplete = null
  } = options;
  
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const timerRef = useRef(null);
  
  useEffect(() => {
    // Reset when the text changes
    setDisplayedText('');
    setIsComplete(false);
    
    if (!startTyping) {
      setIsTyping(false);
      return;
    }
    
    // Start typing after delay
    const startTimer = setTimeout(() => {
      setIsTyping(true);
      let i = 0;
      
      // Clear any existing typing timers
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      // Start the typing effect
      timerRef.current = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(timerRef.current);
          setIsTyping(false);
          setIsComplete(true);
          
          // Call onComplete callback if provided
          if (typeof onComplete === 'function') {
            onComplete();
          }
        }
      }, typingSpeed);
    }, startDelay);
    
    return () => {
      clearTimeout(startTimer);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [text, typingSpeed, startDelay, startTyping, onComplete]);
  
  return {
    displayedText,
    isTyping,
    isComplete
  };
};