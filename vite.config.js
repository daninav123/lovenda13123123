import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { host: true },
  // Custom server config removed so Vite will start on default port without strict port enforcement
});
