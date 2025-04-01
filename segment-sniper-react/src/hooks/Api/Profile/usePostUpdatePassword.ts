import { useMutation } from '@tanstack/react-query';
import { ApiContract } from '../../../services/Api/ApiCommon/ApiContract';
import useApiConfigStore from '../../../stores/useApiConfigStore';
import useTokenDataStore from '../../../stores/useTokenStore';
import postUpdatePassword, {
  UpdatePasswordRequest,
} from '../../../services/Api/Profile/postUpdatePassword';

export const usePostUpdatePassword = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const accessToken = useTokenDataStore(
    (state) => state.tokenData?.accessToken
  );
  const mutate = useMutation({
    mutationFn: async (request: UpdatePasswordRequest) => {
      const contract: ApiContract<UpdatePasswordRequest> = {
        baseUrl: apiConfig!.baseRestApiUrl,
        request: request,
        token: accessToken!,
      };

      const response = await postUpdatePassword(contract);
      return response;
    },
  });

  return mutate;
};
