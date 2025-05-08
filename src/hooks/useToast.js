import { useContext } from "react";
import ToastContext, { TOAST_TYPES, TOAST_POSITIONS } from "../contexts/ToastContext";

/**
 * Custom hook to use the Toast functionality
 * 
 * @returns {Object} Toast methods
 * @returns {Function} .showSuccess - Show a success toast
 * @returns {Function} .showError - Show an error toast
 * @returns {Function} .showWarning - Show a warning toast
 * @returns {Function} .showInfo - Show an info toast
 * @returns {Function} .addToast - Add a custom toast
 * @returns {Function} .removeToast - Remove a toast by ID
 * @returns {Function} .clearAllToasts - Clear all toasts
 * @example
 * const { showSuccess, showError } = useToast();
 * showSuccess('Operation completed!', { position: 'top-right', duration: 3000 });
 * showError('Something went wrong', { position: 'bottom-center' });
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error(
      'useToast must be used within a ToastProvider. ' +
      'Make sure you have wrapped your component tree with <ToastProvider>.'
    );
  }
  
  return context;
};

/**
 * Toast types for better auto-completion
 */
export const ToastTypes = TOAST_TYPES;

/**
 * Toast positions for better auto-completion
 */
export const ToastPositions = TOAST_POSITIONS;

export default useToast;