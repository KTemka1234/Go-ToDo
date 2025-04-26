import { defineConfig, loadEnv, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths'

const parseEnvPort = (port?: string): number => {
  const parsed = Number(port);
  return isNaN(parsed) ? 5173 : parsed;
};

// https://vite.dev/config/
export default defineConfig(({ mode }): UserConfig => {
  // Загружаем env-переменные из родительской директории
  const env = loadEnv(mode, '../', ['VITE_']);

  return {
    envDir: '../',
    plugins: [
      react(),
      tsConfigPaths(),
    ],
    server: {
      port: parseEnvPort(env.VITE_PORT),
      host: true, // Для Docker-контейнеризации
      watch: {
        usePolling: true, // Для работы в Docker на некоторых системах
      },
    },
  };
});
