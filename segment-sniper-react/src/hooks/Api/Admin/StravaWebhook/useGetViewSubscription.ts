import { useQuery } from '@tanstack/react-query';
import useApiConfigStore from '../../../../stores/useApiConfigStore';
import { ApiContract } from '../../../../services/Api/ApiCommon/ApiContract';
import getViewSubscription, {
  ViewSubscriptionRequest,
  ViewSubscriptionResponse,
} from '../../../../services/Api/Admin/StravaWebhook/getViewSubscription';
import { useAuth } from '@clerk/clerk-react';

export const useGetViewSubscription = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const { getToken } = useAuth();

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
    const accessToken = await getToken({ template: 'SegmentSniper' });
    const contract: ApiContract<ViewSubscriptionRequest> = {
      baseUrl: apiConfig!.baseRestApiUrl,
      token: accessToken ?? '',
      abortController,
    };

    const response: ViewSubscriptionResponse = await getViewSubscription(
      contract
    );

    return response;
  }

  return { data, isLoading, isError, error, refetch };
};
