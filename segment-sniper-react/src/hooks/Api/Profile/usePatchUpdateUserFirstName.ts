import { useMutation } from "@tanstack/react-query";
import { ApiContract } from "../../../services/Api/ApiCommon/ApiContract";
import useApiConfigStore from "../../../stores/useApiConfigStore";
import patchUpdateUserFistName, {
  UpdateUserFirstNameRequest,
} from "../../../services/Api/Profile/patchUpdateUserFirstName";
import useProfileStore from "../../../stores/useProfileStore";
import useTokenDataStore from "../../../stores/useTokenStore";
import { useState } from "react";
import useUserStore from "../../../stores/useUserStore";
import { ProfileResponse } from "../../../services/Api/Profile/getProfile";

export const usePatchUpdateUserFirstName = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const token = useTokenDataStore((state) => state.tokenData?.accessToken);
  const [profileData, setProfileData] = useProfileStore((state) => [
    state.profileData,
    state.setProfileData,
  ]);
  const [currentUser, setCurrentUser] = useUserStore((state) => [
    state.user,
    state.setUser,
  ]);
  const [result, setResult] = useState<ProfileResponse>();

  const { mutateAsync, isLoading, isError, error, data } = useMutation(trigger);

  async function trigger(request: UpdateUserFirstNameRequest) {
    const contract: ApiContract<UpdateUserFirstNameRequest> = {
      baseUrl: apiConfig!.baseUrl,
      request: request,
      token: token!,
    };

    await patchUpdateUserFistName(contract).then((res) => {
      setProfileData(res.profileData);
      setCurrentUser({ ...currentUser, firstName: res.profileData.firstName });
      setResult(res);
    });

    return result;
  }

  return { mutateAsync, isLoading, isError, error, data };
};
