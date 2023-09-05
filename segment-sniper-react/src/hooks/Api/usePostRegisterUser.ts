import { useMutation } from "react-query";
import { useNeuron } from "../../store/AppStore";
import { RegisterUserRequest } from "../../services/Api/postRegisterUser";
import { ApiContract } from "../../services/Api/ApiCommon/ApiContract";

export const usePostRegisterUser = () => {
  const { mutate, isLoading } = useMutation(trigger);
  const [userId, setUserId] = useNeuron((store) => store.user.userId);
  const [userEmail, setUserEmail] = useNeuron(
    (store) => store.user.emailAddress
  );
  const [userFirstName, setUserFirstNmae] = useNeuron(
    (store) => store.user.firstName
  );

  async function trigger(request: RegisterUserRequest) {
    const contract: ApiContract = {
      baseUrl: "this needs updated",
      request: request,
    };
  }

  return { mutate, isLoading };
};
