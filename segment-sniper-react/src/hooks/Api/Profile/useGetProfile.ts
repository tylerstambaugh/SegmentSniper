import { useMutation, useQuery } from "@tanstack/react-query";
import useProfileStore from "../../../stores/useProfileStore";
import { ApiContract } from "../../../services/Api/ApiCommon/ApiContract";
import useApiConfigStore from "../../../stores/useApiConfigStore";
import getProfile, {
  ProfileResponse,
} from "../../../services/Api/Profile/getPRofile";

export const useGetClientConfiguration = () => {
  const setProfileData = useProfileStore((state) => state.setProfileData);
  const apiConfig = useApiConfigStore((state) => state.apiConfig);

  const { mutateAsync, data, isLoading, isError, error } = useMutation(trigger);

  async function trigger() {
    const contract: ApiContract = {
      baseUrl: apiConfig!.baseUrl,
    };

    const response: ProfileResponse = await getProfile(contract);

    if (!response.profileData) throw new Error("No profile data found");
    setProfileData(response.profileData);
  }

  return { mutateAsync, data, isLoading, isError, error };
};
