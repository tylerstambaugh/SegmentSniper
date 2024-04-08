import { useMutation } from "@tanstack/react-query";
import { ApiContract } from "../../../services/Api/ApiCommon/ApiContract";
import useApiConfigStore from "../../../stores/useApiConfigStore";
import postUpdateUserFistName, {
  UpdateUserFirstNameRequest,
} from "../../../services/Api/Profile/postUpdateUserFirstName";
import useProfileStore from "../../../stores/useProfileStore";

export const usePostUpdateUserFirstName = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const [setProfileData] = useProfileStore((state) => [state.setProfileData]);

  const { mutateAsync, isLoading, isError, error, data } = useMutation(trigger);

  async function trigger(request: UpdateUserFirstNameRequest) {
    const contract: ApiContract = {
      baseUrl: apiConfig!.baseUrl,
      request: request,
    };

    await postUpdateUserFistName(contract).then((res) => {
      setProfileData(res.userProfile);
    });
  }

  return { mutateAsync, isLoading, isError, error, data };
};
