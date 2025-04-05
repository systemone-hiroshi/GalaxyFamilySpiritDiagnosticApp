// vite.config.js の改善
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production';
  
  return {
    plugins: [react()],
    server: {
      port: 3000,
      open: true
    },
    build: {
      outDir: 'dist',
      minify: isProduction ? 'terser' : false,
      sourcemap: !isProduction,
      terserOptions: isProduction ? {
        compress: {
          drop_console: true, // 本番環境ではコンソールログを削除
          drop_debugger: true
        }
      } : undefined
    }
  };
});