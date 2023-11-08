import { useMutation } from "@tanstack/react-query";

import { ApiContract } from "../../../services/Api/ApiCommon/ApiContract";
import useApiConfigStore from "../../../stores/useApiConfigStore";
import postForgotPassword, {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
} from "../../../services/Api/Auth/postForgotPassword";

export const usePostForgotPassword = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);

  // const query = useQuery({
  //   queryKey: ["Login"],
  //   queryFn: trigger,
  // });
  const { mutateAsync, isLoading, isError, error, data } = useMutation(trigger);

  async function trigger(request: ForgotPasswordRequest) {
    const contract: ApiContract = {
      baseUrl: apiConfig!.baseUrl,
      request: request,
    };

    const response: ForgotPasswordResponse = await postForgotPassword(contract);

    return response;
  }

  //return { query };
  return { mutateAsync, isLoading, isError, error, data };
};
