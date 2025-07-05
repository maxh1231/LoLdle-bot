import { createRoot } from 'react-dom/client';
import React from 'react';
import { BrowserRouter } from 'react-router';
import './index.css';
import { AuthProvider } from './AuthProvider.tsx';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
