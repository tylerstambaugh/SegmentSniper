import { ApiContract } from "../../../services/Api/ApiCommon/ApiContract";

import { useMutation } from "@tanstack/react-query";
import useApiConfigStore from "../../../stores/useApiConfigStore";
import useUserStore, { User } from "../../../stores/useUserStore";
import postRegisterUser, {
  RegisterUserRequest,
  RegisterUserResponse,
} from "../../../services/Api/Auth/postRegisterUser";

export const usePostRegisterUser = () => {
  const { mutateAsync, isLoading, isError, error, data } = useMutation(trigger);
  const apiConfig = useApiConfigStore((state) => state.apiConfig);

  const [setUser] = useUserStore((state) => [state.setUser]);

  async function trigger(request: RegisterUserRequest) {
    const contract: ApiContract<RegisterUserRequest> = {
      baseUrl: apiConfig!.baseUrl,
      request: request,
    };

    const response: RegisterUserResponse = await postRegisterUser(contract);

    const registeredUser: User = {
      id: response.id,
      firstName: response.firstName,
      emailAddress: response.emailAddress,
    };

    setUser(registeredUser);
  }

  return { mutateAsync, isLoading, isError, error, data };
};
