
import React from 'react';
import useApiConfigStore from '../../stores/useApiConfigStore';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

export const ApolloClientProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const baseUrl = useApiConfigStore((state) => state.apiConfig?.baseGraphqlUrl);

  const client = new ApolloClient({
    uri: `${baseUrl}`,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children} </ApolloProvider>;
};
