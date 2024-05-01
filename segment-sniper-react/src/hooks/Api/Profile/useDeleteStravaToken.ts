import { useMutation } from "@tanstack/react-query";
import { ApiContract } from "../../../services/Api/ApiCommon/ApiContract";
import useApiConfigStore from "../../../stores/useApiConfigStore";
import useTokenDataStore from "../../../stores/useTokenStore";
import deleteStravaToken, {
  DeleteStravaTokenRequest,
} from "../../../services/Api/Profile/deleteStravaToken";

export const useDeleteStravaToken = () => {
  const { mutateAsync, isLoading, isError, error, data } = useMutation(trigger);
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const accessToken = useTokenDataStore(
    (state) => state.tokenData?.accessToken
  );
  async function trigger(request: DeleteStravaTokenRequest) {
    const contract: ApiContract = {
      baseUrl: apiConfig!.baseUrl,
      request: request,
      token: accessToken!,
    };

    const response = await deleteStravaToken(contract);
    return response;
  }

  return { mutateAsync, isLoading, isError, error, data };
};
