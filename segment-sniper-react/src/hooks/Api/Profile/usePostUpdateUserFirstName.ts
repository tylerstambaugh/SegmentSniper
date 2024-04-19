import { useMutation } from "@tanstack/react-query";
import { ApiContract } from "../../../services/Api/ApiCommon/ApiContract";
import useApiConfigStore from "../../../stores/useApiConfigStore";
import patchUpdateUserFistName, {
  UpdateUserFirstNameRequest,
} from "../../../services/Api/Profile/patchUpdateUserFirstName";
import useProfileStore from "../../../stores/useProfileStore";
import useTokenDataStore from "../../../stores/useTokenStore";

export const usePatchUpdateUserFirstName = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const token = useTokenDataStore((state) => state.tokenData?.accessToken);
  const [setProfileData] = useProfileStore((state) => [state.setProfileData]);

  const { mutateAsync, isLoading, isError, error, data } = useMutation(trigger);

  async function trigger(request: UpdateUserFirstNameRequest) {
    const contract: ApiContract = {
      baseUrl: apiConfig!.baseUrl,
      request: request,
      token: token!,
    };

    await patchUpdateUserFistName(contract).then((res) => {
      setProfileData(res.userProfile);
    });
  }

  return { mutateAsync, isLoading, isError, error, data };
};
