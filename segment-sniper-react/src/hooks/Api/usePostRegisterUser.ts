import { useMutation } from "react-query";
import { useNeuron } from "../../store/AppStore";
import { RegisterUserRequest } from "../../services/Api/postRegisterUser";
import { ApiContract } from "../../services/Api/ApiCommon/ApiContract";
import { User } from "../../store/types/user";

export const usePostRegisterUser = () => {
  const { mutate, isLoading } = useMutation(trigger);
  const [user, setUser] = useNeuron<User>((store) => store.user);

  async function trigger(request: RegisterUserRequest) {
    const contract: ApiContract = {
      baseUrl: "this needs updated",
      request: request,
    };
  }

  return { mutate, isLoading };
};
