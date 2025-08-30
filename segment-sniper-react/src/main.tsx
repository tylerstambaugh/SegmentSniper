import { BrowserRouter, Route } from 'react-router'
import './index.css';
import Header from './components/Organisms/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import InitializeApp from './components/InitializeApp';
import { Footer } from './components/Organisms/Footer/Footer';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ClerkProvider } from '@clerk/react-router'
import ErrorBoundary from './components/ErrorBoundary';
import { ApolloClientProvider } from './services/Api/ApolloClient';
import AppRoutesComponent from './SegmentSniper.routes';
import { AuthSync } from './components/Organisms/Authentication/AuthSync';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <ErrorBoundary>
    <BrowserRouter>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <ApolloClientProvider>
          <QueryClientProvider client={queryClient}>
            <InitializeApp>
              <Header />
              <AuthSync>
                <AppRoutesComponent />
              </AuthSync>
              <Footer />
            </InitializeApp>
            <Toaster
              toastOptions={{
                success: { duration: 3000, style: { background: 'green' } },
                error: { duration: 5000, style: { background: '#fd2c60' } },
              }}
            />
          </QueryClientProvider>
        </ApolloClientProvider>
      </ClerkProvider>
    </BrowserRouter>
  </ErrorBoundary>
);