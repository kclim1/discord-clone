import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom', // Required for React testing
    include: ['tests/**/*.{test,spec}.{js,jsx,ts,tsx}'], // Look inside the tests folder
  },
});
