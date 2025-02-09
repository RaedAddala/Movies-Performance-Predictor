import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// import viteCompression from 'vite-plugin-compression';
// import { fileURLToPath } from "url";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths(),],
});

// Build Configuration with more improvements
// export default defineConfig({
//   plugins: [tailwindcss(), reactRouter(), tsconfigPaths(),
//   viteCompression({
//     algorithm: 'brotliCompress',
//     ext: '.br',
//     threshold: 1025,
//     deleteOriginFile: true,
//   }),
//   ],
//   resolve: {
//     alias: [
//       {
//         find: "@",
//         replacement: fileURLToPath(new URL("./app", import.meta.url)),
//       },
//     ],
//   },
//   build: {
//     sourcemap: 'hidden',
//     cssCodeSplit: true,
//     cssMinify: 'lightningcss',
//     minify: "terser",
//     terserOptions: {
//       format: {
//         comments: false,
//       },
//     },
//   },
// });