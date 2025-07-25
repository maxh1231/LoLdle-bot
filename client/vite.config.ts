import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
    envDir: '../',
    server: {
        port: 5137,
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false,
                ws: true,
            },
        },
        allowedHosts: true,
        hmr: {
            clientPort: 443,
        },
    },
    plugins: [react(), tailwindcss()],
});
