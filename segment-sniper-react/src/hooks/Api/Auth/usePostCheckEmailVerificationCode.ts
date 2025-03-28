import { useMutation } from '@tanstack/react-query';
import { ApiContract } from '../../../services/Api/ApiCommon/ApiContract';
import useApiConfigStore from '../../../stores/useApiConfigStore';
import useTokenDataStore from '../../../stores/useTokenStore';
import postVerifyEmailConfirmationCode, {
  VerifyEmailConfirmationCodeRequest,
  VerifyEmailConfirmationCodeResponse,
} from '../../../services/Api/Auth/postVerifyEmailConfirmationCode';

export const usePostCheckEmailVerificationCode = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const accessToken = useTokenDataStore(
    (state) => state.tokenData?.accessToken
  );
  const abortController = new AbortController();
  const mutation = useMutation<
    VerifyEmailConfirmationCodeResponse,
    Error,
    VerifyEmailConfirmationCodeRequest
  >({
    mutationFn: async (request: VerifyEmailConfirmationCodeRequest) => {
      if (!apiConfig || !accessToken) {
        throw new Error('API config or access token is not available');
      }

      const contract: ApiContract<VerifyEmailConfirmationCodeRequest> = {
        baseUrl: apiConfig!.baseRestApiUrl,
        token: accessToken!,
        abortController: abortController,
        request: request,
      };

      const response: VerifyEmailConfirmationCodeResponse =
        await postVerifyEmailConfirmationCode(contract);
      return response;
    },
  });
  return mutation;
};
