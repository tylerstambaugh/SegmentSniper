import { useQuery } from '@tanstack/react-query';
import getUserHasStravaToken from '../../../services/Api/Auth/getUserHasStravaToken';
import useApiConfigStore from '../../../stores/useApiConfigStore';
import useUserStore from '../../../stores/useUserStore';
import { ApiContract } from '../../../services/Api/ApiCommon/ApiContract';
import { useAuth } from '@clerk/clerk-react';

export const useGetUserHasStravaToken = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const [user, setUser] = useUserStore((state) => [state.user, state.setUser]);
  const { getToken } = useAuth();

  const { data, refetch, isLoading, isError, error } = useQuery({
    queryFn: triggerQuery,
    queryKey: ['hasStravaToken'],
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const abortController = new AbortController();

  async function triggerQuery() {
    const accessToken = await getToken({ template: 'SegmentSniper' });
    const contract: ApiContract = {
      baseUrl: apiConfig!.baseRestApiUrl,
      token: accessToken ?? '',
      abortController,
    };

    const response = await getUserHasStravaToken(contract);

    setUser({ ...user, hasStravaTokenData: response.hasStravaToken });
    return response.hasStravaToken;
  }

  return { data, refetch, isLoading, isError, error };
};
