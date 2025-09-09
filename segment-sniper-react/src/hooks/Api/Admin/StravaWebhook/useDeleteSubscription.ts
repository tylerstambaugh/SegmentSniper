import { useMutation } from '@tanstack/react-query';
import useApiConfigStore from '../../../../stores/useApiConfigStore';
import deleteSubscription, {
  DeleteSubscriptionResponse,
} from '../../../../services/Api/Admin/StravaWebhook/deleteSubscription';
import { ApiContract } from '../../../../services/Api/ApiCommon/ApiContract';
import { useAuth } from '@clerk/clerk-react';

export const useDeleteSubscription = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const { getToken } = useAuth();

  const mutation = useMutation<DeleteSubscriptionResponse, Error>({
    mutationFn: async () => {
      const accessToken = await getToken({ template: 'SegmentSniper' });
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
