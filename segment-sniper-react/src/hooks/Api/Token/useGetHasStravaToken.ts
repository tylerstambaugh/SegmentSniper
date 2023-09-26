import { useMutation } from "@tanstack/react-query";
import getUserHasStravaToken from "../../../services/Api/getUserHasStravaToken";


export const useGetUserHasStravaToken = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
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

    const response:  = await getUserHasStravaToken(contract);

    setUser(...);
  }

  //return { query };
  return { mutateAsync, isLoading, isError, error, data };
};
