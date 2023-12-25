import { useMutation } from "@tanstack/react-query";

import { ApiContract } from "../../../services/Api/ApiCommon/ApiContract";
import useApiConfigStore from "../../../stores/useApiConfigStore";
import postRevokeUserToken, {
  RevokeUserTokenRequest,
  RevokeUserTokenResponse,
} from "../../../services/Api/Auth/postRevokeUserToken";
import useUserStore from "../../../stores/useUserStore";

export const usePostRevokeUserToken = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const { mutateAsync, isLoading, isError, error, data } = useMutation(trigger);

  async function trigger(request: RevokeUserTokenRequest) {
    const contract: ApiContract = {
      baseUrl: apiConfig!.baseUrl,
      request: request,
    };

    const response: RevokeUserTokenResponse = await postRevokeUserToken(
      contract
    );

    return response;
  }

  return { mutateAsync, isLoading, isError, error, data };
};
