
import React from 'react';
import useApiConfigStore from '../../stores/useApiConfigStore';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, ApolloLink, Observable } from '@apollo/client';
import useTokenDataStore from '../../stores/useTokenStore';
import { setContext } from '@apollo/client/link/context';

export const ApolloClientProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const baseUrl = useApiConfigStore((state) => state.apiConfig?.baseGraphqlUrl);


  const httpLink = new HttpLink({
    uri: `${baseUrl}`,
    headers: {
      'GraphQL-Require-Preflight': '1',
    },
  });

  const authLink = setContext((_, { headers }) => {
    const token = useTokenDataStore.getState().tokenData?.accessToken;
    if (!token) {
      throw new Error('Unauthorized: No access token provided');
    }
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const errorLink = new ApolloLink((operation, forward) => {
    return new Observable((observer) => {
      forward(operation).subscribe({
        next: (result) => {
          observer.next(result);
        },
        error: (error) => {
          if (error.message.includes('Unauthorized')) {
            // Handle the unauthorized error (e.g., redirect to login, show a message)
            console.error('Unauthorized request');
          }
          observer.error(error);
        },
        complete: observer.complete.bind(observer),
      });
    });
  });

  const client = new ApolloClient({
    link: ApolloLink.from([authLink, errorLink, httpLink]),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children} </ApolloProvider>;
};
