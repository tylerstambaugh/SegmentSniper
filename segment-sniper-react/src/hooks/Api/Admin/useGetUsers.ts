import { useQuery } from "@tanstack/react-query";
import useApiConfigStore from "../../../stores/useApiConfigStore";
import useUserStore from "../../../stores/useUserStore";
import getUsers from "../../../services/Api/Admin/getUsers";
import useTokenDataStore from "../../../stores/useTokenStore";
import { useEffect } from "react";

const useGetUsersQuery = () => {
  const setUsers = useUserStore((state) => state.setUsers);
  const [tokenData] = useTokenDataStore((state) => [state.tokenData]);
  const apiConfig = useApiConfigStore((state) => state.apiConfig);

  const abortController = new AbortController();

  const query = useQuery({
    queryFn: getUsersQuery,
    queryKey: ["token"],
  });

  async function getUsersQuery() {
    const usersResponse = await getUsers({
      baseUrl: apiConfig!.baseUrl,
      abortController,
      token: tokenData?.accessToken!,
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
