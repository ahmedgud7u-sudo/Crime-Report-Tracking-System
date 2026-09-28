import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, ".")
      }
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Keep HMR active, but ignore the live database JSON so writes do not trigger page reload loops.
      hmr: process.env.DISABLE_HMR !== "true",
      watch: process.env.DISABLE_HMR === "true" ? null : {
        ignored: ["**/data/**", "**/dist/**", "**/.git/**"]
      }
    }
  };
});
