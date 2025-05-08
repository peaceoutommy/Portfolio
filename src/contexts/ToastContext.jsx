import { createContext, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import Toast from '../components/Ui/Toast';

// Toast types enum for better type safety
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error', 
  WARNING: 'warning',
  INFO: 'info'
};

// Toast positions enum
export const TOAST_POSITIONS = {
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
  TOP_CENTER: 'top-center',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right',
  BOTTOM_CENTER: 'bottom-center'
};

// Create context
const ToastContext = createContext(null);

// Generate a unique ID for each toast
const generateId = () => `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

// Default toast options
const DEFAULT_OPTIONS = {
  position: TOAST_POSITIONS.BOTTOM_RIGHT,
  duration: 5000
};

// Toast provider component
export const ToastProvider = ({ children, maxToasts = 5 }) => {
  const [toasts, setToasts] = useState([]);

  // Add a new toast with rate limiting
  const addToast = useCallback(({ 
    type = TOAST_TYPES.SUCCESS, 
    message, 
    position = DEFAULT_OPTIONS.position, 
    duration = DEFAULT_OPTIONS.duration 
  }) => {
    if (!message) {
      console.warn('Toast message is required');
      return null;
    }

    const id = generateId();
    
    setToasts(prevToasts => {
      // Apply rate limiting - if we have too many toasts, remove the oldest
      const updatedToasts = [...prevToasts];
      if (updatedToasts.length >= maxToasts) {
        updatedToasts.shift(); // Remove the oldest toast
      }
      
      return [
        ...updatedToasts,
        { id, type, message, position, duration }
      ];
    });
    
    return id;
  }, [maxToasts]);

  // Remove a toast by ID
  const removeToast = useCallback((id) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  }, []);

  // Helper methods for different toast types
  const showSuccess = useCallback((message, options = {}) => 
    addToast({ type: TOAST_TYPES.SUCCESS, message, ...options }), [addToast]);
    
  const showError = useCallback((message, options = {}) => 
    addToast({ type: TOAST_TYPES.ERROR, message, ...options }), [addToast]);
    
  const showWarning = useCallback((message, options = {}) => 
    addToast({ type: TOAST_TYPES.WARNING, message, ...options }), [addToast]);
    
  const showInfo = useCallback((message, options = {}) => 
    addToast({ type: TOAST_TYPES.INFO, message, ...options }), [addToast]);

  // Clear all toasts
  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Group toasts by position for better rendering organization
  const groupedToasts = useMemo(() => {
    return toasts.reduce((acc, toast) => {
      if (!acc[toast.position]) {
        acc[toast.position] = [];
      }
      acc[toast.position].push(toast);
      return acc;
    }, {});
  }, [toasts]);

  // Context value with memoization for better performance
  const contextValue = useMemo(() => ({ 
    addToast, 
    removeToast, 
    showSuccess, 
    showError, 
    showWarning, 
    showInfo,
    clearAllToasts
  }), [
    addToast, 
    removeToast, 
    showSuccess, 
    showError, 
    showWarning, 
    showInfo,
    clearAllToasts
  ]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      
      {/* Render toasts by position */}
      {Object.entries(groupedToasts).map(([position, positionToasts]) => (
        <div key={position} className={`toast-container-${position}`}>
          {positionToasts.map(toast => (
            <Toast
              key={toast.id}
              id={toast.id}
              type={toast.type}
              message={toast.message}
              position={toast.position}
              duration={toast.duration}
              onClose={removeToast}
            />
          ))}
        </div>
      ))}
    </ToastContext.Provider>
  );
};

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
  maxToasts: PropTypes.number
};

export default ToastContext;