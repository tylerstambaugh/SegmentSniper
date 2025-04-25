import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import mkcert from 'vite-plugin-mkcert';
import graphqlLoader from 'vite-plugin-graphql-loader';
import codegen from 'vite-plugin-graphql-codegen';

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const apiUrl = env.VITE_SEGMENT_SNIPER_API_URL;
  const graphqlUrl = env.VITE_Segment_SNIPER_GRAPHQL_URL;

  if (mode === 'development') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  }

  const plugins = [
    react(),
    mkcert(),
    graphqlLoader(),
    ...(mode !== 'production' ? [codegen()] : []), // Only include codegen in non-production
  ];

  return defineConfig({
    base: '/',
    server: {
      https: true,
      port: 6767,
      proxy: {
        '/api': { target: apiUrl, secure: false },
        '/graphql': { target: graphqlUrl, secure: true },
      },
    },
    plugins,
    optimizeDeps: {
      include: ['lodash'],
    },
  });
};
