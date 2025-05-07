import { useState, useEffect } from 'react';

export function useTypewriter(text, options = {}) {
  const { 
    typingSpeed = 80,
    startTyping = true,
    onComplete = null
  } = options;
  
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(startTyping);

  useEffect(() => {
    let timer;
    
    if (isTyping) {
      if (displayedText.length < text.length) {
        timer = setTimeout(() => {
          setDisplayedText(text.substring(0, displayedText.length + 1));
        }, typingSpeed);
      } else {
        setIsTyping(false);
        if (onComplete && typeof onComplete === 'function') {
          onComplete();
        }
      }
    }
    
    return () => clearTimeout(timer);
  }, [displayedText, isTyping, text, typingSpeed, onComplete]);

  return { 
    displayedText, 
    isTyping, 
    setIsTyping,
    isComplete: displayedText.length === text.length
  };
}