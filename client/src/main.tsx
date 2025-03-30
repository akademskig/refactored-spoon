import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import './styles/main.scss';
import { AuthModalProvider } from './providers/AuthModalProvider.tsx';
import { AuthProvider } from './providers/AuthProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <AuthModalProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthModalProvider>
    </AuthProvider>
  </StrictMode>,
);
