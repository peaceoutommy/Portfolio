import { useState, useEffect } from 'react';

const Hero = () => {
  const [displayedText1, setDisplayedText1] = useState('');
  const [displayedText2, setDisplayedText2] = useState('');
  const [isTyping1, setIsTyping1] = useState(true);
  const [isTyping2, setIsTyping2] = useState(false);
  
  const fullText1 = "Hi, I'm John Doe";
  const fullText2 = "Full Stack Developer";

  // Improved typewriter effect with better timing
  useEffect(() => {
    let timer1, timer2;
    
    // Type the first text
    if (isTyping1) {
      const typingSpeed = 100; // ms per character
      
      if (displayedText1.length < fullText1.length) {
        timer1 = setTimeout(() => {
          setDisplayedText1(fullText1.substring(0, displayedText1.length + 1));
        }, typingSpeed);
      } else {
        setIsTyping1(false);
        setIsTyping2(true); // Start typing the second text
      }
    }
    
    // Type the second text
    if (isTyping2) {
      const typingSpeed = 100; // ms per character
      
      if (displayedText2.length < fullText2.length) {
        timer2 = setTimeout(() => {
          setDisplayedText2(fullText2.substring(0, displayedText2.length + 1));
        }, typingSpeed);
      } else {
        setIsTyping2(false);
      }
    }
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [displayedText1, displayedText2, isTyping1, isTyping2, fullText1, fullText2]);

  return (
    <section className="w-full max-w-[90vw] md:max-w-6xl mx-auto text-center mb-16" id="home">
      <div className="flex flex-col items-center justify-center">
        <h2 
          className={`text-2xl md:text-5xl neon-text leading-relaxed min-h-[2em] ${isTyping1 ? 'typing' : ''}`}
        >
          {displayedText1}
        </h2>
        <p 
          className={`mt-8 text-xl md:text-3xl neon-text leading-relaxed min-h-[2em] ${isTyping2 ? 'typing' : ''}`}
        >
          {displayedText2}
        </p>
        
        <div className="mt-12 max-w-2xl">
          <p className="neon-text text-lg md:text-xl leading-relaxed">
            Creating stunning digital experiences with modern web technologies.
            Passionate about clean code, responsive design, and performance optimization.
          </p>
          
          <div className="mt-10 flex flex-col md:flex-row gap-6 justify-center">
            <a 
              href="#contact" 
              className="px-8 py-3 rounded-lg border-2 border-[var(--highlight-color)] neon-text-hover transition-all duration-300 hover:bg-[var(--highlight-color)]/10"
            >
              Contact Me
            </a>
            <a 
              href="#projects" 
              className="px-8 py-3 rounded-lg bg-[var(--highlight-color)]/20 border-2 border-[var(--highlight-color)] neon-text-hover transition-all duration-300 hover:bg-[var(--highlight-color)]/30"
            >
              View Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;