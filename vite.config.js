import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',               
    globals: true,                      
    setupFiles: './src/setupTests.js',  
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'cobertura'],
      include: ['src/**/*.{js,jsx}'],
      exclude: ['src/**/*.test.{js,jsx}', 'src/main.jsx'],
      thresholds: {
        'src/hooks/**': { lines: 60, functions: 60, branches: 50, statements: 60 },
        'src/api/**':   { lines: 60, functions: 60, branches: 50, statements: 60 },
      },
    },
  },
});