import { useMutation } from '@tanstack/react-query';
import { ApiContract } from '../../../services/Api/ApiCommon/ApiContract';
import useApiConfigStore from '../../../stores/useApiConfigStore';
import postSendChangeEmailVerificationCode, {
  sendChangeEmailVerificationCodeRequest,
} from '../../../services/Api/Profile/postSendChangeEmailVerificationCode';
import useTokenDataStore from '../../../stores/useTokenStore';

export const usePostSendChangeEmailVerificationCode = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const accessToken = useTokenDataStore(
    (state) => state.tokenData?.accessToken
  );

  const mutation = useMutation<
    void,
    Error,
    sendChangeEmailVerificationCodeRequest
  >({
    mutationFn: async (request: sendChangeEmailVerificationCodeRequest) => {
      if (apiConfig && accessToken) {
        const contract: ApiContract<sendChangeEmailVerificationCodeRequest> = {
          baseUrl: apiConfig!.baseRestApiUrl,
          request: request,
          token: accessToken!,
        };

        await postSendChangeEmailVerificationCode(contract);
      }
    },
  });

  return mutation;
};
