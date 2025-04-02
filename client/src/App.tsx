import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { ModalProvider } from './providers/ModalProvider';
import { AuthProvider } from './providers/AuthProvider';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

const App = () => (
  <StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <ModalProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ModalProvider>
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>
);

export default App;
