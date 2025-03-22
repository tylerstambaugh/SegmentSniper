import { useMutation } from '@tanstack/react-query';
import { ApiContract } from '../../../services/Api/ApiCommon/ApiContract';
import useApiConfigStore from '../../../stores/useApiConfigStore';
import useTokenDataStore from '../../../stores/useTokenStore';
import useProfileStore from '../../../stores/useProfileStore';
import useUserStore from '../../../stores/useUserStore';
import deleteAccount, {
  DeleteAccountResponse,
} from '../../../services/Api/Profile/deleteAccount';

export const useDeleteAccount = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const resetProfileData = useProfileStore((state) => state.resetProfileData);
  const resetUserStore = useUserStore((state) => state.resetUserStore);
  const [accessToken, resetTokendata] = useTokenDataStore((state) => [
    state.tokenData?.accessToken,
    state.resetTokenDataStore,
  ]);

  const mutation = useMutation<DeleteAccountResponse, Error>({
    mutationFn: async () => {
      const contract: ApiContract = {
        baseUrl: apiConfig!.baseRestApiUrl,
        token: accessToken!,
      };

      const response = await deleteAccount(contract);
      if (response.success) {
        resetTokendata();
        resetProfileData();
        resetUserStore();
      }
      return response;
    },
  });
  return mutation;
};
