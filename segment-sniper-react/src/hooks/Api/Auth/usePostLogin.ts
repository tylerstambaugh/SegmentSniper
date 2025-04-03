import { useMutation } from '@tanstack/react-query';
import postLogin, { LoginRequest } from '../../../services/Api/Auth/postLogin';
import { ApiContract } from '../../../services/Api/ApiCommon/ApiContract';
import useTokenDataStore from '../../../stores/useTokenStore';
import useUserStore from '../../../stores/useUserStore';
import useApiConfigStore from '../../../stores/useApiConfigStore';

export const usePostLogin = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const [setTokenData, setIsAuthenticated] = useTokenDataStore((state) => [
    state.setTokenData,
    state.setIsAuthenticated,
  ]);
  const [setUser] = useUserStore((state) => [state.setUser]);

  const mutate = useMutation<void, Error, LoginRequest>({
    mutationFn: async (request: LoginRequest) => {
      const contract: ApiContract<LoginRequest> = {
        baseUrl: apiConfig!.baseRestApiUrl,
        request: request,
      };

      await postLogin(contract).then(async (res) => {
        setUser(res.userData);
        await setTokenData(res.tokenData);
        if (res.tokenData.accessToken !== null) setIsAuthenticated(true);
      });
    },
  });

  return mutate;
};
