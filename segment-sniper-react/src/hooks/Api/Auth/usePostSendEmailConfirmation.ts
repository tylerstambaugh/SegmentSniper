import { useMutation } from '@tanstack/react-query';
import { ApiContract } from '../../../services/Api/ApiCommon/ApiContract';
import useApiConfigStore from '../../../stores/useApiConfigStore';
import useTokenDataStore from '../../../stores/useTokenStore';
import postSendEmailConfirmation, {
  SendEmailConfirmationCodeRequest,
  SendEmailConfirmationCodeResponse,
} from '../../../services/Api/Auth/postSendEmailConfirmationCode';
import { useEffect, useMemo } from 'react';

export const usePostSendEmailConfirmation = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const accessToken = useTokenDataStore(
    (state) => state.tokenData?.accessToken
  );
  const abortController = useMemo(() => new AbortController(), []);
  const mutation = useMutation({
    mutationFn: async (request: SendEmailConfirmationCodeRequest) => {
      const contract: ApiContract<SendEmailConfirmationCodeRequest> = {
        baseUrl: apiConfig!.baseRestApiUrl,
        token: accessToken!,
        abortController: abortController,
        request: request,
      };
      const response: SendEmailConfirmationCodeResponse =
        await postSendEmailConfirmation(contract);

      return response;
    },
  });

  useEffect(() => {
    return () => {
      abortController.abort();
    };
  }, [abortController]);

  return mutation;
};
