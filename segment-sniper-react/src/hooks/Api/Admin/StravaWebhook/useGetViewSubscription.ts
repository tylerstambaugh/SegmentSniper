import { useQuery } from '@tanstack/react-query';

import useApiConfigStore from '../../../../stores/useApiConfigStore';
import useTokenDataStore from '../../../../stores/useTokenStore';
import { ApiContract } from '../../../../services/Api/ApiCommon/ApiContract';
import getViewSubscription, {
  ViewSubscriptionRequest,
  ViewSubscriptionResponse,
} from '../../../../services/Api/Admin/StravaWebhook/getViewSubscription';

export const useGetCreateSubscription = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const tokenData = useTokenDataStore((state) => state.tokenData);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryFn: triggerQuery,
    queryKey: ['viewQebhookSubscription'],
    enabled: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const abortController = new AbortController();

  async function triggerQuery() {
    const contract: ApiContract<ViewSubscriptionRequest> = {
      baseUrl: apiConfig!.baseRestApiUrl,
      token: tokenData?.accessToken ?? '',
      abortController,
    };

    const response: ViewSubscriptionResponse = await getViewSubscription(
      contract
    );

    return response;
  }

  return { data, isLoading, isError, error, refetch };
};
