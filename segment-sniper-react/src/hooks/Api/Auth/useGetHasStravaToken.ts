import { useMutation } from '@tanstack/react-query';
import getUserHasStravaToken from '../../../services/Api/Auth/getUserHasStravaToken';
import useApiConfigStore from '../../../stores/useApiConfigStore';
import useUserStore from '../../../stores/useUserStore';
import { ApiContract } from '../../../services/Api/ApiCommon/ApiContract';
import useTokenDataStore from '../../../stores/useTokenStore';

export const useGetUserHasStravaToken = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const [user, setUser] = useUserStore((state) => [state.user, state.setUser]);
  const [tokenData] = useTokenDataStore((state) => [state.tokenData]);

  const { mutateAsync, isLoading, isError, error, data } = useMutation(trigger);

  async function trigger() {
    const contract: ApiContract = {
      baseUrl: apiConfig!.baseRestApiUrl,
      token: tokenData?.accessToken!,
    };

    const response = await getUserHasStravaToken(contract);

    setUser({ ...user, hasStravaTokenData: response.hasStravaToken });
  }

  return { mutateAsync, isLoading, isError, error, data };
};
