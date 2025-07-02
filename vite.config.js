import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    // Use default Vite port (5173) and allow automatic fallback if taken
    port: 5173,
    strictPort: false
  },
  preview: {
    port: 5173,
    strictPort: false
  }
});
