import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    define: {
      // This is critical for the app to work on Netlify.
      // It replaces `process.env.API_KEY` in the code with the actual value from the build environment.
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      // Support for custom Base URL (useful for proxies)
      'process.env.API_BASE_URL': JSON.stringify(env.API_BASE_URL || ''),
    },
  };
});