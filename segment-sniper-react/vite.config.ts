import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const apiUrl = env.VITE_SEGMENT_SNIPER_API_URL;

  return defineConfig({
    base: "/",
    server: {
      https: true,
      port: 6767,
      proxy: {
        "/api": { target: apiUrl, secure: false },
      },
    },
    plugins: [react(), mkcert()],
  });
};
