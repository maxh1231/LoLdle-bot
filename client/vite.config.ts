import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
    envDir: '../',
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false,
                ws: true,
            },
        },
        allowedHosts: true,
        headers: {
            'X-Frame-Options': 'ALLOWALL',
            'Content-Security-Policy': 'frame-ancestors *',
        },
        hmr: {
            clientPort: 443,
        },
    },
    plugins: [react()],
});
