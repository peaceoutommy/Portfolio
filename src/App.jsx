import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';
import ProjectDetail from './components/Pages/ProjectDetail';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
import Home from './components/Pages/Home';
import ProjectDetail from './components/Pages/ProjectDetail';

const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <ToastProvider>
          <div className="min-h-screen flex flex-col">
            <AnimatedBackground />
            <Navbar />

            <main className="flex-grow flex flex-col items-center sm:mt-8 px-4 sm:px-8 md:px-16 lg:px-32 max-w-screen-2xl mx-auto w-full">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/project/:projectId" element={<ProjectDetail />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </ToastProvider>
      </ThemeProvider>
    </Router>
  );
};
export default App;
