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
        allowedHosts: ['fred-fog-automation-brunette.trycloudflare.com'],
        hmr: {
            clientPort: 443,
        },
    },
    plugins: [react()],
});
