import { useQuery } from '@tanstack/react-query';
import getCreateSubscription, {
  CreateSubscriptionRequest,
  CreateSubscriptionResponse,
} from '../../../../services/Api/Admin/StravaWebhook/getCreateSubscription';
import useApiConfigStore from '../../../../stores/useApiConfigStore';
import useTokenDataStore from '../../../../stores/useTokenStore';
import { ApiContract } from '../../../../services/Api/ApiCommon/ApiContract';

export const useGetCreateSubscription = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const tokenData = useTokenDataStore((state) => state.tokenData);

  const { data, isLoading, isError, error } = useQuery({
    queryFn: triggerQuery,
    queryKey: ['createQebhookSubscription'],
    enabled: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const abortController = new AbortController();

  async function triggerQuery() {
    const contract: ApiContract<CreateSubscriptionRequest> = {
      baseUrl: apiConfig!.baseRestApiUrl,
      token: tokenData?.accessToken ?? '',
      abortController,
    };

    const response: CreateSubscriptionResponse = await getCreateSubscription(
      contract
    );

    return response;
  }

  return { data, isLoading, isError, error };
};
