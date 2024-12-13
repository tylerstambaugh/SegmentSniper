import { useMutation } from '@tanstack/react-query';
import { ApiContract } from '../../../services/Api/ApiCommon/ApiContract';
import useTokenDataStore from '../../../stores/useTokenStore';
import useApiConfigStore from '../../../stores/useApiConfigStore';
import postResetPassword, {
  ResetPasswordRequest,
  ResetPasswordResponse,
} from '../../../services/Api/Auth/postResetPassword';

export const usePostResetPassword = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);

  const { mutateAsync, isLoading, isError, error, data } = useMutation(trigger);

  async function trigger(request: ResetPasswordRequest) {
    const contract: ApiContract<ResetPasswordRequest> = {
      baseUrl: apiConfig!.baseRestApiUrl,
      request: request,
    };

    const response: ResetPasswordResponse = await postResetPassword(contract);

    return response;
  }

  return { mutateAsync, isLoading, isError, error, data };
};
