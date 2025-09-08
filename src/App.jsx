import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './components/Pages/Home';
import ProjectDetail from './components/Pages/ProjectDetail';

const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <ToastProvider>
          <div className="min-h-screen flex flex-col">
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
