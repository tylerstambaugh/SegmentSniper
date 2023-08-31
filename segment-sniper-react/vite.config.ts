import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/app",
  server: {
    https: true,
    port: 6767,
    proxy: {
      "/api": { target: "https://localhost:44351", secure: false },
    },
  },
  plugins: [react(), mkcert()],
});
