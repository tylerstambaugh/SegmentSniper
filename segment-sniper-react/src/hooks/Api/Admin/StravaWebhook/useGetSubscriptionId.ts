import { useQuery } from '@tanstack/react-query';

import useApiConfigStore from '../../../../stores/useApiConfigStore';
import useTokenDataStore from '../../../../stores/useTokenStore';
import { ApiContract } from '../../../../services/Api/ApiCommon/ApiContract';
import getSubscriptionId, {
  GetSubscriptionIdRequest,
  SubscriptionIdResponse,
} from '../../../../services/Api/Admin/StravaWebhook/getSubscriptionId';

export const useGetSubscriptionId = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const tokenData = useTokenDataStore((state) => state.tokenData);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryFn: triggerQuery,
    queryKey: ['getWebhookSubscriptionId'],
    enabled: true,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: 0,
  });

  const abortController = new AbortController();

  async function triggerQuery() {
    const contract: ApiContract<GetSubscriptionIdRequest> = {
      baseUrl: apiConfig!.baseRestApiUrl,
      token: tokenData?.accessToken ?? '',
      abortController,
    };

    const response: SubscriptionIdResponse = await getSubscriptionId(contract);

    return response;
  }

  return { data, isLoading, isError, error, refetch };
};
