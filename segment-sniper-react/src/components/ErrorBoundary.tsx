import React, { Component, ReactNode } from 'react';
import Header from './Organisms/Header/Header';
import { Footer } from './Organisms/Footer/Footer';
import ErrorPage from './Atoms/ErrorPage';

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean, error?: string }> {
    constructor(props: { children: ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        // Update state so the next render shows the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        // Log the error to an error reporting service
        console.error("Error caught by ErrorBoundary:", error, info);
    }

    render() {
        if (this.state.hasError) {
            <>

                <Header />
                <ErrorPage error={this.state.error} />
                <Footer />
            </>
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
