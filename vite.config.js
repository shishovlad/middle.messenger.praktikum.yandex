import { resolve } from "path";
import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";

const SERVER_PORT = 3000;
const PREVIEW_PORT = 3000;

export default defineConfig({
  root: resolve(__dirname, "./"),
  server: {
    port: SERVER_PORT,
  },
  preview: {
    port: PREVIEW_PORT,
  },
  plugins: [
    handlebars({
      partialDirectory: [
        resolve(__dirname, "src/components"),
        resolve(__dirname, "src/layouts"),
      ],
    }),
  ],

  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        login: resolve(__dirname, "src/pages/auth/login.html"),
        signup: resolve(__dirname, "src/pages/auth/signup.html"),
        chat: resolve(__dirname, "src/pages/chat/list.html"),
        settings: resolve(__dirname, "src/pages/profile/settings.html"),
        404: resolve(__dirname, "src/pages/error/404.html"),
        500: resolve(__dirname, "src/pages/error/500.html"),
      },
    },
  },
});
