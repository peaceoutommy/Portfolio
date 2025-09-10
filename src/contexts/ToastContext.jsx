import { createContext, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import GlowText from '../components/ui/GlowText';
import Icons from '../components/ui/Icons';
import Button from '../components/ui/Button';

// Toast Types
export const ToastTypes = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning'
};

// Toast Positions
export const ToastPositions = {
  TOP_LEFT: 'toast-container-top-left',
  TOP_RIGHT: 'toast-container-top-right',
  BOTTOM_LEFT: 'toast-container-bottom-left',
  BOTTOM_RIGHT: 'toast-container-bottom-right',
  TOP_CENTER: 'toast-container-top-center',
  BOTTOM_CENTER: 'toast-container-bottom-center'
};


export const ToastContext = createContext(null);


const Toast = ({ message, type, onClose, duration = 3000, position = ToastPositions.TOP_RIGHT }) => {

  const getIcon = () => {
    switch (type) {
      case ToastTypes.SUCCESS:
        return <Icons name="CheckCircle" />;
      case ToastTypes.ERROR:
        return <Icons name="AlertCircle" />;
      case ToastTypes.WARNING:
        return <Icons name="AlertTriangle" />;
      case ToastTypes.INFO:
      default:
        return <Icons name="Info" />;
    }
  };

  // Get the background color based on toast type
  const getBgColor = () => {
    switch (type) {
      case ToastTypes.SUCCESS:
        return 'bg-green-500/20 border-green-500/50';
      case ToastTypes.ERROR:
        return 'bg-red-500/20 border-red-500/50';
      case ToastTypes.WARNING:
        return 'bg-yellow-500/20 border-yellow-500/50';
      case ToastTypes.INFO:
      default:
        return 'bg-blue-500/20 border-blue-500/50';
    }
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        x: position.includes('right') ? 20 : position.includes('left') ? -20 : 0, 
        y: position.includes('top') ? -20 : position.includes('bottom') ? 20 : 0 
      }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ 
        opacity: 0, 
        x: position.includes('right') ? 20 : position.includes('left') ? -20 : 0, 
        y: position.includes('top') ? -20 : position.includes('bottom') ? 20 : 0 
      }}
      className={`rounded-md border-2 shadow-lg p-4 w-72 backdrop-blur-md ${getBgColor()}`}
      style={{
        boxShadow: 'var(--box-shadow-md)'
      }}
    >
      <div className="flex items-start gap-3 w-full relative overflow-hidden">
        <div className="pt-0.5">
          {getIcon()}
        </div>
        <div className="flex-grow">
          <GlowText intensity="medium">{message}</GlowText>
        </div>
        <Button 
          onClick={onClose} 
          size="sm"
          className="text-base hover:text-white transition-colors"
          aria-label="Close notification"
        >
          <Icons name="X" />
        </Button>
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 h-0.5 bg-white/20 w-full">
          <div 
            className="h-full bg-white/50"
            style={{ 
              animation: `shrink-width ${duration}ms linear forwards`,
              transformOrigin: 'left'
            }}
          ></div>
        </div>
      </div>
    </motion.div>
  );
};

// Toast Container component
const ToastContainer = ({ toasts, position, removeToast }) => {
  return createPortal(
    <div className={`${position} fixed z-50 space-y-3`}>
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            position={toast.position}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
};

// ToastProvider component
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Generate a unique ID for each toast
  const generateUniqueId = useCallback(() => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }, []);

  // Add a new toast
  const addToast = useCallback((message, type, options = {}) => {
    const id = generateUniqueId();
    const toast = {
      id,
      message,
      type,
      position: options.position || ToastPositions.TOP_RIGHT,
      duration: options.duration || 3000
    };
    
    setToasts(prev => [...prev, toast]);

    // Auto-remove the toast after duration
    setTimeout(() => {
      removeToast(id);
    }, toast.duration);

    return id;
  }, [generateUniqueId]);

  // Remove a toast by ID
  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // Convenience methods for different toast types
  const showSuccess = useCallback((message, options) => {
    return addToast(message, ToastTypes.SUCCESS, options);
  }, [addToast]);

  const showError = useCallback((message, options) => {
    return addToast(message, ToastTypes.ERROR, options);
  }, [addToast]);

  const showInfo = useCallback((message, options) => {
    return addToast(message, ToastTypes.INFO, options);
  }, [addToast]);

  const showWarning = useCallback((message, options) => {
    return addToast(message, ToastTypes.WARNING, options);
  }, [addToast]);

  // Group toasts by position
  const groupedToasts = toasts.reduce((acc, toast) => {
    if (!acc[toast.position]) {
      acc[toast.position] = [];
    }
    acc[toast.position].push(toast);
    return acc;
  }, {});

  return (
    <ToastContext.Provider value={{ showSuccess, showError, showInfo, showWarning, removeToast }}>
      {children}
      
      {/* Render toast containers for each position */}
      {Object.entries(groupedToasts).map(([position, toasts]) => (
        <ToastContainer
          key={position}
          position={position}
          toasts={toasts}
          removeToast={removeToast}
        />
      ))}
    </ToastContext.Provider>
  );
};