import { useQuery } from '@tanstack/react-query';
import useApiConfigStore from '../../../stores/useApiConfigStore';
import useUserStore from '../../../stores/useUserStore';
import { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import getMe from '../../../services/Api/User/getMe';

const useGetMeQuery = () => {
  const setUser = useUserStore((state) => state.setUser);
  const { getToken } = useAuth();
  const apiConfig = useApiConfigStore((state) => state.apiConfig);

  const abortController = new AbortController();

  const query = useQuery({
    queryFn: getMeQuery,
    queryKey: ['me'],
  });

  async function getMeQuery() {
    const accessToken = await getToken({ template: 'SegmentSniper' });

    console.log('Access Token:', accessToken); // Debug log

    const usersResponse = await getMe({
      baseUrl: apiConfig!.baseRestApiUrl,
      abortController,
      token: accessToken ?? '',
    });

    setUser(usersResponse);
    return usersResponse;
  }

  useEffect(() => {
    return () => {
      abortController.abort();
    };
  }, []);

  return query;
};

export default useGetMeQuery;
