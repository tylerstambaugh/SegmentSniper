import { useQuery } from '@tanstack/react-query';
import getCreateSubscription, {
  CreateSubscriptionRequest,
  CreateSubscriptionResponse,
} from '../../../../services/Api/Admin/StravaWebhook/getCreateSubscription';
import useApiConfigStore from '../../../../stores/useApiConfigStore';

import { ApiContract } from '../../../../services/Api/ApiCommon/ApiContract';
import { useAuth } from '@clerk/clerk-react';

export const useGetCreateSubscription = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const { getToken } = useAuth();
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryFn: triggerQuery,
    queryKey: ['createQebhookSubscription'],
    enabled: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: 0,
  });

  const abortController = new AbortController();

  async function triggerQuery() {
    const accessToken = await getToken({ template: 'SegmentSniper' });
    const contract: ApiContract<CreateSubscriptionRequest> = {
      baseUrl: apiConfig!.baseRestApiUrl,
      token: accessToken ?? '',
      abortController,
    };

    const response: CreateSubscriptionResponse = await getCreateSubscription(
      contract
    );

    return response;
  }

  return { data, isLoading, isError, error, refetch };
};
