import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';

try {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>,
  );
} catch (err) {
  // Depuración rápida: mostrar error en la página para evitar pantalla en blanco
  console.error('Error rendering app:', err);
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `<pre style="white-space:pre-wrap;color:red;padding:16px">${err.stack || err}</pre>`;
  }
}
