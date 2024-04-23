import { useMutation } from "@tanstack/react-query";
import { ApiContract } from "../../../services/Api/ApiCommon/ApiContract";
import useApiConfigStore from "../../../stores/useApiConfigStore";
import useProfileStore from "../../../stores/useProfileStore";
import postUpdateEmailAddress, {
  UpdateEmailAddressRequest,
} from "../../../services/Api/Profile/postUpdateEmailAddress";

export const usePostUpdateEmailAddress = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const [setProfileData] = useProfileStore((state) => [state.setProfileData]);

  const { mutateAsync, isLoading, isError, error, data } = useMutation(trigger);

  async function trigger(request: UpdateEmailAddressRequest) {
    const contract: ApiContract = {
      baseUrl: apiConfig!.baseUrl,
      request: request,
    };

    await postUpdateEmailAddress(contract).then((res) => {
      setProfileData(res.profileData);
    });
  }

  return { mutateAsync, isLoading, isError, error, data };
};
