// src/components/ui/ErrorBoundary.jsx
import { Component } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import GlowText from './GlowText';
import Button from './Button';
import Icons from './Icons';
import { ITEM_VARIANTS } from '../../constants/animations';

/**
 * Standardized Error Boundary for consistent error handling
 * Provides graceful error recovery and user-friendly error messages
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      console.error('Error caught by boundary:', error, errorInfo);
      // Add your error reporting service here (Sentry, LogRocket, etc.)
    }
  }

  handleReset = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
  };

  render() {
    if (this.state.hasError) {
      const { fallback: Fallback } = this.props;

      // Use custom fallback if provided
      if (Fallback) {
        return <Fallback error={this.state.error} resetError={this.handleReset} />;
      }

      // Default error UI
      return (
        <motion.div
          className="min-h-[400px] flex items-center justify-center p-8"
          variants={ITEM_VARIANTS.fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center max-w-md">
            <motion.div
              className="mb-6"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              <Icons name="AlertTriangle" className="w-16 h-16 mx-auto text-red-400" />
            </motion.div>

            <GlowText as="h2" className="text-2xl mb-4" intensity="medium">
              Something went wrong
            </GlowText>

            <p className="text-white/70 mb-6">
              We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-left">
                <summary className="cursor-pointer text-red-300 mb-2">
                  Error Details (Development)
                </summary>
                <pre className="text-xs text-red-200 whitespace-pre-wrap overflow-auto">
                  {this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}

            <div className="flex gap-4 justify-center">
              <Button 
                onClick={this.handleReset}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Icons name="RotateCcw" className="w-4 h-4" />
                Try Again
              </Button>

              <Button
                onClick={() => window.location.reload()}
                variant="primary"
                className="flex items-center gap-2"
              >
                <Icons name="RefreshCw" className="w-4 h-4" />
                Refresh Page
              </Button>
            </div>
          </div>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.elementType
};

export default ErrorBoundary;