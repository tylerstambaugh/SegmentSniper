import React, { useMemo } from "react";
import useApiConfigStore from "../../stores/useApiConfigStore";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuth } from "@clerk/clerk-react";

export const ApolloClientProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const baseUrl = useApiConfigStore(
    (state) => state.apiConfig?.baseGraphqlUrl
  );
  const { getToken } = useAuth();

  const httpLink = useMemo(() => {
    return new HttpLink({
      uri: baseUrl,
      headers: { "GraphQL-Require-Preflight": "1" },
    });
  }, [baseUrl]);

  const authLink = useMemo(() => {
    return setContext(async (_, { headers }) => {
      try {
        const accessToken = await getToken({ template: "SegmentSniper" });
        return {
          headers: {
            ...headers,
            Authorization: accessToken ? `Bearer ${accessToken}` : "",
          },
        };
      } catch (err) {
        console.warn("Token fetch failed:", err);
        return { headers };
      }
    });
  }, [getToken]);

  const client = useMemo(() => {
    if (!baseUrl) return null;
    return new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
      connectToDevTools: import.meta.env.DEV,
    });
  }, [authLink, httpLink, baseUrl]);

  if (!client) return null;

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
