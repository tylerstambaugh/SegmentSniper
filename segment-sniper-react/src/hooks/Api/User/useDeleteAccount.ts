import { useMutation } from '@tanstack/react-query';
import { ApiContract } from '../../../services/Api/ApiCommon/ApiContract';
import useApiConfigStore from '../../../stores/useApiConfigStore';
import useProfileStore from '../../../stores/useProfileStore';
import useUserStore from '../../../stores/useUserStore';
import deleteAccount, {
  DeleteAccountResponse,
} from '../../../services/Api/User/deleteAccount';
import { useAuth } from '@clerk/clerk-react';

export const useDeleteAccount = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const resetProfileData = useProfileStore((state) => state.resetProfileData);
  const resetUserStore = useUserStore((state) => state.resetUserStore);
  const { getToken } = useAuth();

  const mutation = useMutation<DeleteAccountResponse, Error>({
    mutationFn: async () => {
      const accessToken = await getToken({ template: 'SegmentSniper' });

      const contract: ApiContract = {
        baseUrl: apiConfig!.baseRestApiUrl,
        token: accessToken!,
      };

      const response = await deleteAccount(contract);
      if (response.success) {
        resetProfileData();
        resetUserStore();
      }
      return response;
    },
  });
  return mutation;
};
