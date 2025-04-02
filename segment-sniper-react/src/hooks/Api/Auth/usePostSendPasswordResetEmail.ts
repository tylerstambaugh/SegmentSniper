import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { ApiContract } from '../../../services/Api/ApiCommon/ApiContract';
import useApiConfigStore from '../../../stores/useApiConfigStore';
import useTokenDataStore from '../../../stores/useTokenStore';
import postSendPasswordResetEmail, {
  SendPasswordResetEmailRequest,
  SendPasswordResetEmailResponse,
} from '../../../services/Api/Auth/postSendPasswordResetEmail';

export const usePostSendPasswordResetEmail = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const accessToken = useTokenDataStore(
    (state) => state.tokenData?.accessToken
  );
  const abortController = new AbortController();
  const mutate = useMutation<
    SendPasswordResetEmailResponse,
    Error,
    SendPasswordResetEmailRequest
  >({
    mutationFn: async (request: SendPasswordResetEmailRequest) => {
      const contract: ApiContract<SendPasswordResetEmailRequest> = {
        baseUrl: apiConfig!.baseRestApiUrl,
        token: accessToken!,
        abortController: abortController,
        request: request,
      };
      const response: SendPasswordResetEmailResponse =
        await postSendPasswordResetEmail(contract);

      return response;
    },
  });
  useEffect(() => {
    return () => {
      abortController.abort();
    };
  });

  return mutate;
};
