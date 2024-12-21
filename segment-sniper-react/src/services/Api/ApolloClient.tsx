
import React from 'react';
import useApiConfigStore from '../../stores/useApiConfigStore';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';

export const ApolloClientProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const baseUrl = useApiConfigStore((state) => state.apiConfig?.baseGraphqlUrl);

  const client = new ApolloClient({
    // uri: `${baseUrl}`,
    link: new HttpLink({
      uri: `${baseUrl}`, // Replace with your GraphQL endpoint
      headers: {
        'GraphQL-Require-Preflight': '1', // Include the required header
      },
    }),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children} </ApolloProvider>;
};
