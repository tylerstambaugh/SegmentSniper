import { useMutation } from '@tanstack/react-query';
import { ApiContract } from '../../../services/Api/ApiCommon/ApiContract';
import useApiConfigStore from '../../../stores/useApiConfigStore';
import postResetPassword, {
  ResetPasswordRequest,
  ResetPasswordResponse,
} from '../../../services/Api/Auth/postResetPassword';

export const usePostResetPassword = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);

  const mutation = useMutation<
    ResetPasswordResponse,
    Error,
    ResetPasswordRequest
  >({
    mutationFn: async (request: ResetPasswordRequest) => {
      const contract: ApiContract<ResetPasswordRequest> = {
        baseUrl: apiConfig!.baseRestApiUrl,
        request: request,
      };

      const response: ResetPasswordResponse = await postResetPassword(contract);

      return response;
    },
  });
  return mutation;
};
