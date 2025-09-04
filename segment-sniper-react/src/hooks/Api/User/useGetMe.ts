import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import useApiConfigStore from '../../../stores/useApiConfigStore';
import useUserStore from '../../../stores/useUserStore';
import { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import getMe from '../../../services/Api/User/getMe';
import { AppUserModel } from '../../../models/AppUserModel';

const useGetMeQuery = (
  options?: Omit<UseQueryOptions<AppUserModel, Error>, 'queryKey' | 'queryFn'>
) => {
  const setUser = useUserStore((state) => state.setUser);
  const { getToken } = useAuth();
  const apiConfig = useApiConfigStore((state) => state.apiConfig);

  const abortController = new AbortController();

  async function getMeQuery() {
    const accessToken = await getToken({ template: 'SegmentSniper' });

    const usersResponse = await getMe({
      baseUrl: apiConfig!.baseRestApiUrl,
      abortController,
      token: accessToken ?? '',
    });

    setUser(usersResponse);
    return usersResponse;
  }

  const query = useQuery({
    queryFn: getMeQuery,
    queryKey: ['me'],
    ...options,
  });

  useEffect(() => {
    return () => {
      abortController.abort();
    };
  }, []);

  return query;
};

export default useGetMeQuery;
