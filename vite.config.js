import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// yarn add --dev vite-plugin-node-polyfills
//socket.dev/npm/package/vite-plugin-node-polyfills
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      // Enable esbuild polyfill plugins
      plugins: [
        nodePolyfills({
          // Whether to polyfill `node:` protocol imports.
          protocolImports: true,
        }),
      ],
    },
  },
});
