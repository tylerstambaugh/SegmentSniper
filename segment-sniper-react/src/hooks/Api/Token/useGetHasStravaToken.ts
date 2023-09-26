import { useMutation } from "@tanstack/react-query";
import getUserHasStravaToken from "../../../services/Api/getUserHasStravaToken";
import useApiConfigStore from "../../../store/useApiConfigStore";
import useUserStore from "../../../store/useUserStore";
import { ApiContract } from "../../../services/Api/ApiCommon/ApiContract";

export const useGetUserHasStravaToken = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const [user, setUser] = useUserStore((state) => [state.user, state.setUser]);

  // const query = useQuery({
  //   queryKey: ["Login"],
  //   queryFn: trigger,
  // });
  const { mutateAsync, isLoading, isError, error, data } = useMutation(trigger);

  async function trigger() {
    const contract: ApiContract = {
      baseUrl: apiConfig!.baseUrl,
    };

    const response = await getUserHasStravaToken(contract);

    setUser({ ...user, hasStravaTokenData: response.userHasStravaToken });
  }

  //return { query };
  return { mutateAsync, isLoading, isError, error, data };
};
