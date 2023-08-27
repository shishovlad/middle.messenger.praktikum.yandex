import { resolve } from 'path'
import { defineConfig } from 'vite'
import vitePluginHandlebarsPrecompile from './vite-plugin-handelbars-precompile'

const SERVER_PORT = 3000
const PREVIEW_PORT = 3000

export default defineConfig({
  root: resolve(__dirname, 'src'),
  server: {
    port: SERVER_PORT
  },
  preview: {
    port: PREVIEW_PORT
  },
  build: {
    outDir: resolve(__dirname, 'dist')
  },
  plugins: [vitePluginHandlebarsPrecompile()]
})
