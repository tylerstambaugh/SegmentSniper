import { useMutation, useQuery } from "@tanstack/react-query";
import postLogin, {
  LoginRequest,
  LoginResponse,
} from "../../services/Api/postLogin";
import { ApiContract } from "../../services/Api/ApiCommon/ApiContract";
import { ApiConfig } from "../../store/types/apiConfig";
import { useNeuron } from "../../store/AppStore";
import { Token } from "../../store/types/token";
import { User } from "../../store/types/user";

export const usePostLogin = () => {
  const [apiConfig] = useNeuron<ApiConfig>("apiConfig");
  const [user, setUser] = useNeuron<User>("user");
  const [token, setToken] = useNeuron<Token>("tokenData");

  //const query = useQuery({ queryKey: ["login"], queryFn: trigger });
  const { mutate, isLoading, isError, error, data } = useMutation(trigger);

  async function trigger(request: LoginRequest) {
    const contract: ApiContract = {
      baseUrl: apiConfig.baseUrl,
      request: request,
    };

    const response: LoginResponse = await postLogin(contract);

    setUser(response.userData);
    setToken(response.tokenData);
  }

  //return { query };
  return { mutate, isLoading, isError, error, data };
};
