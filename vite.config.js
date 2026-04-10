import { fileURLToPath, URL } from 'node:url'
import { cwd } from 'node:process'

import { defineConfig, loadEnv } from 'vite'
import terser from '@rollup/plugin-terser'
import { setupVitePlugins } from './build/plugins/index.js'
import pkg from './package.json'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const root = cwd()
  const env = loadEnv(mode, root)
  console.log('ENV:\n', env)

  const { VITE_PORT, VITE_INTERNAL_VERSION, VITE_BASE_API, VITE_PROXY } = env
  const __APP_VERSION__ = [pkg.version, VITE_INTERNAL_VERSION].join('.')
  const __APP_BUILD_TIME__ = new Date().toISOString()

  return {
    plugins: setupVitePlugins({ mode, version: __APP_VERSION__, buildTime: __APP_BUILD_TIME__, viteEnv: env }),

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    server: {
      port: Number(VITE_PORT),
      proxy: VITE_PROXY
        ? {
            [VITE_BASE_API]: {
              target: VITE_PROXY,
              changeOrigin: true,
              rewrite: (path) => path.replace(VITE_BASE_API, ''),
            },
          }
        : undefined,
    },

    preview: {
      proxy: VITE_PROXY
        ? {
            [VITE_BASE_API]: {
              target: VITE_PROXY,
              changeOrigin: true,
              rewrite: (path) => path.replace(VITE_BASE_API, ''),
            },
          }
        : undefined,
    },

    define: {
      __APP_VERSION__: JSON.stringify(__APP_VERSION__),
      __APP_BUILD_TIME__: JSON.stringify(__APP_BUILD_TIME__),
    },

    build: {
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name].[hash].js',
          entryFileNames: 'assets/js/[name].[hash].js',
          assetFileNames: 'assets/[ext]/[name].[hash].[ext]',
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia'],
            'naive-ui': ['naive-ui'],
            echarts: ['echarts'],
          },
        },
        plugins: [
          terser({
            compress: {
              drop_debugger: true,
              pure_funcs: Object.keys(console)
                .filter((key) => !['debug', 'error'].includes(key))
                .map((key) => `console.${key}`),
            },
          }),
        ],
      },
    },
  }
})
