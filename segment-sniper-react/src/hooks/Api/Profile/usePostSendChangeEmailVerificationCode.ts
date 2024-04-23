import { useMutation } from "@tanstack/react-query";
import { ApiContract } from "../../../services/Api/ApiCommon/ApiContract";
import useApiConfigStore from "../../../stores/useApiConfigStore";
import useProfileStore from "../../../stores/useProfileStore";
import postSendChangeEmailVerificationCode, {
  sendChangeEmailVerificationCodeRequest,
} from "../../../services/Api/Profile/postSendChangeEmailVerificationCode";
import useTokenDataStore from "../../../stores/useTokenStore";

export const usePostSendChangeEmailVerificationCode = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const tokenData = useTokenDataStore((state) => state.tokenData);
  const [setProfileData] = useProfileStore((state) => [state.setProfileData]);

  const { mutateAsync, isLoading, isError, error, data } = useMutation(trigger);

  async function trigger(request: sendChangeEmailVerificationCodeRequest) {
    const contract: ApiContract = {
      baseUrl: apiConfig!.baseUrl,
      request: request,
      token: tokenData?.accessToken!,
    };

    await postSendChangeEmailVerificationCode(contract);
  }

  return { mutateAsync, isLoading, isError, error, data };
};
