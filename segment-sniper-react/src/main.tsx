import { BrowserRouter as Router } from 'react-router-dom';
//import './App.css';
import './index.css';
import Header from './components/Organisms/Header/Header';
import Routes from './SegmentSniper.routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import AuthenticatedUserMonitor from './components/Organisms/Authentication/AuthenticatedUserMonitor';
import InitializeApp from './components/InitializeApp';
import { Footer } from './components/Organisms/Footer/Footer';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ErrorBoundary from './components/ErrorBoundary';

const client = new QueryClient();

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <>

    <ErrorBoundary>
      <QueryClientProvider client={client}>
        <Router>
          <InitializeApp>
            <ReactQueryDevtools initialIsOpen={false} />
            <AuthenticatedUserMonitor />
            <Header />
            <Routes />
            <Footer />
          </InitializeApp>
        </Router>
        <Toaster
          toastOptions={{
            success: {
              duration: 3000,
              style: {
                background: 'green',
              },
            },
            error: {
              duration: 5000,
              style: {
                background: '#fd2c60',
              },
            },
          }}
        />
      </QueryClientProvider>
    </ErrorBoundary>
  </>
);
