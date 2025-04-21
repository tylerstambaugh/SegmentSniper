import { CodegenConfig } from '@graphql-codegen/cli';
import https from 'https';
import fetch from 'node-fetch';

const agent = new https.Agent({ rejectUnauthorized: false });

const customFetch: typeof fetch = (url, options = {}) =>
  fetch(url, {
    ...options,
    agent,
  });

const config: CodegenConfig = {
  schema: [
    {
      'https://localhost:44351/graphql': {
        request: {
          headers: {
            'GraphQL-Require-Preflight': 'true',
          },
          customFetch,
        },
      },
    },
  ],
  documents: 'src/**/*.graphql',
  generates: {
    'src/graphql/generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false,
        scalars: {
          DateTime: 'string',
          Decimal: 'number',
          Int: 'number',
        },
      },
    },
  },
};

export default config;
