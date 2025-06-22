import { useMutation } from '@tanstack/react-query';
import useTokenDataStore from '../../../../stores/useTokenStore';
import useApiConfigStore from '../../../../stores/useApiConfigStore';
import deleteSubscription, {
  DeleteSubscriptionRequest,
  DeleteSubscriptionResponse,
} from '../../../../services/Api/Admin/StravaWebhook/deleteSubscription';
import { ApiContract } from '../../../../services/Api/ApiCommon/ApiContract';

export const useDeleteAccount = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const [accessToken] = useTokenDataStore((state) => [
    state.tokenData?.accessToken,
  ]);

  const mutation = useMutation<
    DeleteSubscriptionResponse,
    Error,
    DeleteSubscriptionRequest
  >({
    mutationFn: async (request: DeleteSubscriptionRequest) => {
      const contract: ApiContract<DeleteSubscriptionRequest> = {
        baseUrl: apiConfig!.baseRestApiUrl,
        token: accessToken!,
        request: request,
      };

      const response = await deleteSubscription(contract);

      return response;
    },
  });
  return mutation;
};
