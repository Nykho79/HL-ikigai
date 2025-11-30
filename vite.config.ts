import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Charge les variables d'environnement basées sur le mode (development, production)
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Remplace process.env.API_KEY par la valeur réelle lors du build
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});