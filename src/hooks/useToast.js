// src/hooks/useToast.js
import { useContext } from 'react';
import { ToastContext, ToastTypes, ToastPositions } from '../contexts/ToastContext';

/**
 * Custom hook for using the toast notification system
 * 
 * @returns {Object} Toast functions
 * @returns {Function} showSuccess - Display a success toast
 * @returns {Function} showError - Display an error toast
 * @returns {Function} showInfo - Display an info toast
 * @returns {Function} showWarning - Display a warning toast
 * @returns {Function} removeToast - Remove a specific toast by ID
 * 
 * Each show function accepts:
 * @param {string} message - The toast message
 * @param {Object} options - Options for customizing the toast
 * @param {string} options.position - Position of the toast (default: TOP_RIGHT)
 * @param {number} options.duration - Duration in milliseconds (default: 3000)
 * 
 * @example
 * const { showSuccess } = useToast();
 * 
 * showSuccess('Operation completed successfully!', {
 *   position: ToastPositions.TOP_RIGHT,
 *   duration: 5000
 * });
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  
  return context;
};

export { ToastTypes, ToastPositions };
export default useToast;