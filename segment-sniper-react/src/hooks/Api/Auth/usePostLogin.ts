import { useMutation } from "@tanstack/react-query";
import postLogin, {
  LoginRequest,
  LoginResponse,
} from "../../../services/Api/Auth/postLogin";
import { ApiContract } from "../../../services/Api/ApiCommon/ApiContract";
import useTokenDataStore from "../../../stores/useTokenStore";
import useUserStore from "../../../stores/useUserStore";
import useApiConfigStore from "../../../stores/useApiConfigStore";

export const usePostLogin = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const [setTokenData] = useTokenDataStore((state) => [state.setTokenData]);
  const [setUser] = useUserStore((state) => [state.setUser]);

  const { mutateAsync, isLoading, isError, error, data } = useMutation(trigger);

  async function trigger(request: LoginRequest) {
    const contract: ApiContract<LoginRequest> = {
      baseUrl: apiConfig!.baseUrl,
      request: request,
    };

    await postLogin(contract).then((res) => {
      setUser(res.userData);
      setTokenData(res.tokenData);
    });
  }

  return { mutateAsync, isLoading, isError, error, data };
};
