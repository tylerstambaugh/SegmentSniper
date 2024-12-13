import { useQuery } from '@tanstack/react-query';
import useTokenDataStore from '../../../stores/useTokenStore';
import { useEffect } from 'react';
import useApiConfigStore from '../../../stores/useApiConfigStore';
import postRefreshToken from '../../../services/Api/Auth/postRefreshToken';

const useRefreshTokenQuery = () => {
  const [tokenData, setTokenData] = useTokenDataStore((state) => [
    state.tokenData,
    state.setTokenData,
  ]);

  const apiConfig = useApiConfigStore((state) => state.apiConfig);

  const abortController = new AbortController();

  const query = useQuery({
    queryFn: refreshTokenQuery,
    queryKey: ['token'],
    enabled: false,
    refetchInterval: 60 * 1000 * 29.5,
    refetchIntervalInBackground: true,
  });

  async function refreshTokenQuery() {
    if (tokenData?.refreshToken && tokenData?.accessToken) {
      try {
        const tokenDataResponse = await postRefreshToken({
          baseUrl: apiConfig!.baseRestApiUrl,
          request: {
            refreshToken: tokenData.refreshToken,
            accessToken: tokenData.accessToken,
          },
          abortController,
        });

        await setTokenData(tokenDataResponse.refreshedToken);
        return tokenDataResponse;
      } catch (error) {
        //If staying authenticated becomes an issue, good luck.
        //throw new Error('Failed to refresh token.');
      }
    }

    // Return a default value or throw an error when conditions are not met
    //throw new Error('Missing token data for refresh.');
    return { accessToken: null, refreshToken: null };
  }

  useEffect(() => {
    return () => {
      abortController.abort();
    };
  }, []);

  return query;
};

export default useRefreshTokenQuery;
