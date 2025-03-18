// vite.config.ts
import { defineConfig, loadEnv } from "file:///C:/repos/SegmentSniper/segment-sniper-react/node_modules/vite/dist/node/index.js";
import react from "file:///C:/repos/SegmentSniper/segment-sniper-react/node_modules/@vitejs/plugin-react/dist/index.mjs";
import mkcert from "file:///C:/repos/SegmentSniper/segment-sniper-react/node_modules/vite-plugin-mkcert/dist/mkcert.mjs";
import graphqlLoader from "file:///C:/repos/SegmentSniper/segment-sniper-react/node_modules/vite-plugin-graphql-loader/dist/index.js";
import codegen from "file:///C:/repos/SegmentSniper/segment-sniper-react/node_modules/vite-plugin-graphql-codegen/dist/index.mjs";
var vite_config_default = ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const apiUrl = env.VITE_SEGMENT_SNIPER_API_URL;
  const graphqlUrl = env.VITE_Segment_SNIPER_GRAPHQL_URL;
  if (mode === "development") {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  }
  return defineConfig({
    base: "/",
    server: {
      https: true,
      port: 6767,
      proxy: {
        "/api": { target: apiUrl, secure: false },
        "/graphql": { target: graphqlUrl, secure: true }
      }
    },
    plugins: [react(), mkcert(), graphqlLoader(), codegen()],
    optimizeDeps: {
      include: ["lodash"]
    }
  });
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxyZXBvc1xcXFxTZWdtZW50U25pcGVyXFxcXHNlZ21lbnQtc25pcGVyLXJlYWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxyZXBvc1xcXFxTZWdtZW50U25pcGVyXFxcXHNlZ21lbnQtc25pcGVyLXJlYWN0XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9yZXBvcy9TZWdtZW50U25pcGVyL3NlZ21lbnQtc25pcGVyLXJlYWN0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCBta2NlcnQgZnJvbSAndml0ZS1wbHVnaW4tbWtjZXJ0JztcclxuaW1wb3J0IGdyYXBocWxMb2FkZXIgZnJvbSAndml0ZS1wbHVnaW4tZ3JhcGhxbC1sb2FkZXInO1xyXG5pbXBvcnQgY29kZWdlbiBmcm9tICd2aXRlLXBsdWdpbi1ncmFwaHFsLWNvZGVnZW4nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKHsgbW9kZSB9KSA9PiB7XHJcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKTtcclxuICBjb25zdCBhcGlVcmwgPSBlbnYuVklURV9TRUdNRU5UX1NOSVBFUl9BUElfVVJMO1xyXG4gIGNvbnN0IGdyYXBocWxVcmwgPSBlbnYuVklURV9TZWdtZW50X1NOSVBFUl9HUkFQSFFMX1VSTDtcclxuXHJcbiAgaWYgKG1vZGUgPT09ICdkZXZlbG9wbWVudCcpIHtcclxuICAgIHByb2Nlc3MuZW52Lk5PREVfVExTX1JFSkVDVF9VTkFVVEhPUklaRUQgPSAnMCc7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZGVmaW5lQ29uZmlnKHtcclxuICAgIGJhc2U6ICcvJyxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBodHRwczogdHJ1ZSxcclxuICAgICAgcG9ydDogNjc2NyxcclxuICAgICAgcHJveHk6IHtcclxuICAgICAgICAnL2FwaSc6IHsgdGFyZ2V0OiBhcGlVcmwsIHNlY3VyZTogZmFsc2UgfSxcclxuICAgICAgICAnL2dyYXBocWwnOiB7IHRhcmdldDogZ3JhcGhxbFVybCwgc2VjdXJlOiB0cnVlIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgcGx1Z2luczogW3JlYWN0KCksIG1rY2VydCgpLCBncmFwaHFsTG9hZGVyKCksIGNvZGVnZW4oKV0sXHJcbiAgICBvcHRpbWl6ZURlcHM6IHtcclxuICAgICAgaW5jbHVkZTogWydsb2Rhc2gnXSxcclxuICAgIH0sXHJcbiAgfSk7XHJcbn07XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMlQsU0FBUyxjQUFjLGVBQWU7QUFDalcsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sWUFBWTtBQUNuQixPQUFPLG1CQUFtQjtBQUMxQixPQUFPLGFBQWE7QUFFcEIsSUFBTyxzQkFBUSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQzNCLFFBQU0sTUFBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLENBQUM7QUFDdkMsUUFBTSxTQUFTLElBQUk7QUFDbkIsUUFBTSxhQUFhLElBQUk7QUFFdkIsTUFBSSxTQUFTLGVBQWU7QUFDMUIsWUFBUSxJQUFJLCtCQUErQjtBQUFBLEVBQzdDO0FBRUEsU0FBTyxhQUFhO0FBQUEsSUFDbEIsTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0wsUUFBUSxFQUFFLFFBQVEsUUFBUSxRQUFRLE1BQU07QUFBQSxRQUN4QyxZQUFZLEVBQUUsUUFBUSxZQUFZLFFBQVEsS0FBSztBQUFBLE1BQ2pEO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUyxDQUFDLE1BQU0sR0FBRyxPQUFPLEdBQUcsY0FBYyxHQUFHLFFBQVEsQ0FBQztBQUFBLElBQ3ZELGNBQWM7QUFBQSxNQUNaLFNBQVMsQ0FBQyxRQUFRO0FBQUEsSUFDcEI7QUFBQSxFQUNGLENBQUM7QUFDSDsiLAogICJuYW1lcyI6IFtdCn0K
