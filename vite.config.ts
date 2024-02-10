/* eslint-disable new-cap */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

import { fileURLToPath, URL } from "url";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { PrimeVueResolver } from "unplugin-vue-components/resolvers";
import removeConsole from "vite-plugin-remove-console";

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    removeConsole(),
    AutoImport({
      dts: "./auto-imports.d.ts",
      imports: [
        "vue",
        {
          "@tanstack/vue-table": ["*"],
        },
      ],
      dirs: ["src/services"],
      eslintrc: {
        enabled: true,
      },
    }),
    Components({
      dts: true,
      resolvers: [PrimeVueResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    sourcemap: true,
    minify: false,
    chunkSizeWarningLimit: 10000,
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
});