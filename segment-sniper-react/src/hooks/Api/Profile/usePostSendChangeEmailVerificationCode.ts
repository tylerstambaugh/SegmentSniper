import { useMutation } from "@tanstack/react-query";
import { ApiContract } from "../../../services/Api/ApiCommon/ApiContract";
import useApiConfigStore from "../../../stores/useApiConfigStore";
import useProfileStore from "../../../stores/useProfileStore";
import postSendChangeEmailVerificationCode, {
  sendChangeEmailVerificationCodeRequest,
} from "../../../services/Api/Profile/postSendChangeEmailVerificationCode";

export const usePostSendChangeEmailVerificationCode = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const [setProfileData] = useProfileStore((state) => [state.setProfileData]);

  const { mutateAsync, isLoading, isError, error, data } = useMutation(trigger);

  async function trigger(request: sendChangeEmailVerificationCodeRequest) {
    const contract: ApiContract = {
      baseUrl: apiConfig!.baseUrl,
      request: request,
    };

    await postSendChangeEmailVerificationCode(contract).then((res) => {
      setProfileData(res.userProfile);
    });
  }

  return { mutateAsync, isLoading, isError, error, data };
};
