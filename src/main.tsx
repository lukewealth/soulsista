import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './app/App.tsx';
import { ThemeProvider } from './shared/theme';
import { CurrencyProvider } from './shared/currency';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <CurrencyProvider>
        <App />
      </CurrencyProvider>
    </ThemeProvider>
  </StrictMode>,
);
