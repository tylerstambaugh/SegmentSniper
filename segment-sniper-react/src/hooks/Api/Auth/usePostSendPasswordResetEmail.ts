import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { ApiContract } from "../../../services/Api/ApiCommon/ApiContract";
import useApiConfigStore from "../../../stores/useApiConfigStore";
import useTokenDataStore from "../../../stores/useTokenStore";
import postSendPasswordResetEmail, {
  SendPasswordResetEmailRequest,
  SendPasswordResetEmailResponse,
} from "../../../services/Api/Auth/postSendPasswordResetEmail";

export const usePostSendPasswordResetEmail = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const tokenData = useTokenDataStore((state) => state.tokenData);
  const abortController = new AbortController();
  const { mutateAsync, isLoading, isError, error, data } = useMutation(trigger);

  async function trigger(request: SendPasswordResetEmailRequest) {
    const contract: ApiContract = {
      baseUrl: apiConfig!.baseUrl,
      token: tokenData?.accessToken!,
      abortController: abortController,
      request:  request,
    };
    const response: SendPasswordResetEmailResponse =
      await postSendPasswordResetEmail(contract);

    return response;
  }

  useEffect(() => {
    return () => {
      abortController.abort();
    };
  }, []);

  return { mutateAsync, isLoading, isError, error, data };
};
