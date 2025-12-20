import React from 'react';
import ErrorPage from './Atoms/ErrorPage';
import { Footer } from './Organisms/Footer/Footer';
import ErrorHeader from './Organisms/Header/ErrorHeader';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  resetKey?: string;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  { hasError: boolean; error?: string }
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error: error.message,
    };
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (this.props.resetKey !== prevProps.resetKey && this.state.hasError) {
      this.setState({ hasError: false, error: undefined });
    }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <ErrorHeader />
          <ErrorPage error={this.state.error} />
          <Footer />
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
