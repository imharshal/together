import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// yarn add rollup-plugin-node-polyfills
import rollupNodePolyFill from "rollup-plugin-node-polyfills";
// yarn add vite-plugin-node-stdlib-browser
import nodePolyfills from "vite-plugin-node-stdlib-browser";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        // Enable rollup polyfills plugin
        // used during production bundling
        rollupNodePolyFill(),
      ],
    },
  },
});
