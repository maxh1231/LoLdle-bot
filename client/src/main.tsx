import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import App from './App.tsx';
import Classic from './pages/Classic.tsx';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <StrictMode>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/classic' element={<Classic />} />
            </Routes>
        </StrictMode>
    </BrowserRouter>
);
