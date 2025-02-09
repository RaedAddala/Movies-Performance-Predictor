import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { fileURLToPath } from "url";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths(),],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./app", import.meta.url)),
      },
    ],
  },
  build: {
    sourcemap: false,
    cssCodeSplit: true,
    manifest: true,
    outDir: 'build/client',
    cssMinify: 'lightningcss',
    minify: "terser",
    terserOptions: {
      format: {
        comments: false,
      },
    },
  },
});