import { useMutation, useQuery } from "@tanstack/react-query";
import useProfileStore from "../../../stores/useProfileStore";
import { ApiContract } from "../../../services/Api/ApiCommon/ApiContract";
import useApiConfigStore from "../../../stores/useApiConfigStore";
import getProfile, {
  ProfileResponse,
} from "../../../services/Api/Profile/getProfile";
import { useNeuron } from "../../../stores/NeuronStore";
import useTokenDataStore from "../../../stores/useTokenStore";

export const useGetProfileQuery = () => {
  const setProfileData = useProfileStore((state) => state.setProfileData);
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const tokenData = useTokenDataStore((state) => state.tokenData);
  const { data, isLoading, isError, error } = useQuery({
    queryFn: triggerQuery,
    queryKey: ["profile"],
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const abortController = new AbortController();

  async function triggerQuery() {
    const contract: ApiContract = {
      baseUrl: apiConfig!.baseUrl,
      token: tokenData?.accessToken!,
      abortController,
    };

    const response: ProfileResponse = await getProfile(contract);

    if (!response.profileData) throw new Error("No profile data found");
    // setProfile(response.profileData);
    setProfileData(response.profileData);
    return response.profileData;
  }

  return { data, isLoading, isError, error };
};
