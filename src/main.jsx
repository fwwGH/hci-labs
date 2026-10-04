import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { DataProvider } from './context/DataContext';
import { ShopProvider } from './context/ShopContext';
import './index.css';
import './responsive-fixes.css';
import './pages.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <DataProvider>
        <ShopProvider>
          <App />
        </ShopProvider>
      </DataProvider>
    </BrowserRouter>
  </StrictMode>,
);
