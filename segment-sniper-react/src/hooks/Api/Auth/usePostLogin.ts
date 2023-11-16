import { useMutation } from "@tanstack/react-query";
import postLogin, {
  LoginRequest,
  LoginResponse,
} from "../../../services/Api/Auth/postLogin";
import { ApiContract } from "../../../services/Api/ApiCommon/ApiContract";
import useTokenDataStore from "../../../stores/useTokenStore";
import useUserStore, { User } from "../../../stores/useUserStore";
import useApiConfigStore from "../../../stores/useApiConfigStore";

export const usePostLogin = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const [setTokenData] = useTokenDataStore((state) => [state.setTokenData]);
  const [setUser] = useUserStore((state) => [state.setUser]);

  // const query = useQuery({
  //   queryKey: ["Login"],
  //   queryFn: trigger,
  // });
  const { mutateAsync, isLoading, isError, error, data } = useMutation(trigger);

  async function trigger(request: LoginRequest) {
    const contract: ApiContract = {
      baseUrl: apiConfig!.baseUrl,
      request: request,
    };

    const response: LoginResponse = await postLogin(contract);

    setUser(response.userData);
    setTokenData(response.tokenData);
  }

  //return { query };
  return { mutateAsync, isLoading, isError, error, data };
};
