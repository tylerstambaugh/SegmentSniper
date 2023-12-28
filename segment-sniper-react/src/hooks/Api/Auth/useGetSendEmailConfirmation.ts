import { useQuery } from "@tanstack/react-query";

import { ApiContract } from "../../../services/Api/ApiCommon/ApiContract";
import useApiConfigStore from "../../../stores/useApiConfigStore";

import useTokenDataStore from "../../../stores/useTokenStore";
import getSendEmailConfirmation, {
  SendEmailConfirmationCodeResponse,
} from "../../../services/Api/Auth/getSendEmailConfirmationCode";
import { useEffect } from "react";

export const useGetSendEmailConfirmation = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const tokenData = useTokenDataStore((state) => state.tokenData);
  const abortController = new AbortController();
  const query = useQuery({
    queryFn: sendEmailConfirmationQuery,
    queryKey: ["sendEmailConfirmationCode"],
    enabled: false,
  });

  async function sendEmailConfirmationQuery() {
    const contract: ApiContract = {
      baseUrl: apiConfig!.baseUrl,
      token: tokenData?.accessToken!,
      abortController,
    };

    const response: SendEmailConfirmationCodeResponse =
      await getSendEmailConfirmation(contract);

    return response;
  }

  useEffect(() => {
    return () => {
      abortController.abort();
    };
  }, []);

  const { isLoading, isError, data } = query;

  return { query, isLoading, isError, data };
};
