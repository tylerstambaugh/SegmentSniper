import { useQuery } from '@tanstack/react-query';
import useApiConfigStore from '../../../stores/useApiConfigStore';
import useUserStore from '../../../stores/useUserStore';
import getUsers from '../../../services/Api/Admin/getUsers';
import { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';

const useGetUsersQuery = () => {
  const setUsers = useUserStore((state) => state.setUsers);
  const { getToken } = useAuth();
  const apiConfig = useApiConfigStore((state) => state.apiConfig);

  const abortController = new AbortController();

  const query = useQuery({
    queryFn: getUsersQuery,
    queryKey: ['users'],
  });

  async function getUsersQuery() {
    const accessToken = await getToken({ template: 'SegmentSniper' });
    const usersResponse = await getUsers({
      baseUrl: apiConfig!.baseRestApiUrl,
      abortController,
      token: accessToken ?? '',
    });

    setUsers(usersResponse.users);
    return;
  }

  useEffect(() => {
    return () => {
      abortController.abort();
    };
  }, []);

  return query;
};

export default useGetUsersQuery;
