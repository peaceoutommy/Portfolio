import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/sections/Hero';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Timeline from './components/sections/Timeline';
import Education from './components/sections/Education';
import Contact from './components/sections/Contact';
import AnimatedBackground from './components/AnimatedBackground';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';

const App = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <div className="min-h-screen flex flex-col">
          <AnimatedBackground />

          <Navbar />

          <main className="flex-grow flex flex-col items-center sm:mt-8 px-4 sm:px-8 md:px-16 lg:px-32 max-w-screen-2xl mx-auto w-full">
            <Hero />
            <Skills />
            <Projects />
            <Timeline />
            <Education />
            <Contact />
          </main>

          <Footer />
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;