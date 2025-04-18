import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react'; // Import useState
import { ApiContract } from '../../../services/Api/ApiCommon/ApiContract';
import useApiConfigStore from '../../../stores/useApiConfigStore';
import getLogout, {
  RevokeUserTokenResponse,
} from '../../../services/Api/Auth/getLogout';
import useTokenDataStore from '../../../stores/useTokenStore';

export const useGetLogout = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const tokenData = useTokenDataStore((state) => state.tokenData);
  const [shouldFetch, setShouldFetch] = useState(false);

  const {
    data,
    refetch: queryRefetch,
    isLoading,
    isError,
    error,
  } = useQuery<RevokeUserTokenResponse, Error>({
    queryFn: trigger,
    queryKey: ['logout'],
    enabled:
      shouldFetch && !!apiConfig?.baseRestApiUrl && !!tokenData?.accessToken,
    refetchOnMount: false,
    retry: false,
  });

  const abortController = new AbortController();

  async function trigger() {
    const contract: ApiContract = {
      baseUrl: apiConfig!.baseRestApiUrl,
      token: tokenData?.accessToken ?? '',
      abortController,
    };

    const response: RevokeUserTokenResponse = await getLogout(contract);

    return response;
  }

  const refetch = () => {
    setShouldFetch(true);
    return queryRefetch();
  };

  useEffect(() => {
    if (data || isError) {
      setShouldFetch(false);
    }
  }, [data, isError]);

  return { data, refetch, isLoading, isError, error };
};
