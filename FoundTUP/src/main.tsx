import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { BrowserRouter } from 'react-router'

import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/nunito";
import '@fontsource/gaegu/300.css';
import '@fontsource/gaegu/400.css';
import '@fontsource/gaegu/700.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
