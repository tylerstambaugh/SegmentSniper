import { useMutation } from '@tanstack/react-query';
import useTokenDataStore from '../../../../stores/useTokenStore';
import useApiConfigStore from '../../../../stores/useApiConfigStore';
import deleteSubscription, {
  DeleteSubscriptionResponse,
} from '../../../../services/Api/Admin/StravaWebhook/deleteSubscription';
import { ApiContract } from '../../../../services/Api/ApiCommon/ApiContract';

export const useDeleteSubscription = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const [accessToken] = useTokenDataStore((state) => [
    state.tokenData?.accessToken,
  ]);

  const mutation = useMutation<DeleteSubscriptionResponse, Error>({
    mutationFn: async () => {
      const contract: ApiContract = {
        baseUrl: apiConfig!.baseRestApiUrl,
        token: accessToken!,
      };

      const response = await deleteSubscription(contract);

      return response;
    },
  });
  return mutation;
};
