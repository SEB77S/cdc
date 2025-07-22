import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 👉 IMPORTANTE
import './index.css';
import App from './App.jsx';
import 'ag-grid-enterprise';
import { LicenseManager } from 'ag-grid-enterprise';
import '@ant-design/v5-patch-for-react-19';
import './assets/styles/fonts.css'
LicenseManager.setLicenseKey('YOUR_LICENSE_KEY_HERE');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);