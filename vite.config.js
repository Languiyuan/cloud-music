import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { resolve } from 'path'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  css: {
    /* CSS 预处理器 */
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/scss/var.scss";',
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@apis': resolve(__dirname, 'src/apis'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@plugins': resolve(__dirname, 'src/plugins'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@views': resolve(__dirname, 'src/views'),
    },
  },
  server: {
    port: 9999,
    host: '0.0.0.0',
    https: false,
  },
})
