import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    ...configDefaults,
    globals: true, // Enables global `describe`, `it`, and `expect`
    environment: 'jsdom', // Simulates a browser environment
    setupFiles: './src/setupTests.ts',
  },
});
