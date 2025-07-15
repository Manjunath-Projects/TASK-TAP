// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/TASK-TAP/", // 👈 exact repo name
  plugins: [react()],
});
