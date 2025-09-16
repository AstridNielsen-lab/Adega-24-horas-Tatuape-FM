import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';

const root = createRoot(document.getElementById('root')!);

// Check if user is stored and determine initial route
const initialPath = localStorage.getItem('user') ? '/' : '/splash';
window.history.replaceState({}, '', initialPath);

root.render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);