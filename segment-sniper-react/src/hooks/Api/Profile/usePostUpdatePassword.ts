import { useMutation } from "@tanstack/react-query";
import { ApiContract } from "../../../services/Api/ApiCommon/ApiContract";
import useApiConfigStore from "../../../stores/useApiConfigStore";
import useTokenDataStore from "../../../stores/useTokenStore";
import postUpdatePassword, {
  UpdatePasswordRequest,
} from "../../../services/Api/Profile/postUpdatePassword";

export const usePostUpdatePassword = () => {
  const { mutateAsync, isLoading, isError, error, data } = useMutation(trigger);
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const accessToken = useTokenDataStore(
    (state) => state.tokenData?.accessToken
  );
  async function trigger(request: UpdatePasswordRequest) {
    const contract: ApiContract = {
      baseUrl: apiConfig!.baseUrl,
      request: request,
      token: accessToken!,
    };

    const response = await postUpdatePassword(contract);
    return response;
  }

  return { mutateAsync, isLoading, isError, error, data };
};
