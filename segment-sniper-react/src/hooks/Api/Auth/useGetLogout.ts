import { useQuery } from '@tanstack/react-query';

import { ApiContract } from '../../../services/Api/ApiCommon/ApiContract';
import useApiConfigStore from '../../../stores/useApiConfigStore';
import getLogout, {
  RevokeUserTokenResponse,
} from '../../../services/Api/Auth/getLogout';
import useTokenDataStore from '../../../stores/useTokenStore';

export const useGetLogout = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const tokenData = useTokenDataStore((state) => state.tokenData);
  const { data, isLoading, isError, error } = useQuery({
    queryFn: trigger,
    queryKey: ['logout'],
    refetchOnMount: false,
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

  return { data, isLoading, isError, error };
};
