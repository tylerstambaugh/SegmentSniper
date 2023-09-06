import { useNeuron } from "../../store/AppStore";
import { ApiContract } from "./ApiCommon/ApiContract";
import { apiPost } from "./BaseApiService";

export type RegisterUserRequest = {
  firstName: string;
  emailAddress: string;
  password: string;
};

export interface RegisterUserResponse {
  id: string;
  firstName: string;
  emailAddress: string;
}

export default async function postRegisterUser(
  contract: ApiContract<RegisterUserRequest>
) {
  const response = apiPost<RegisterUserRequest, RegisterUserResponse>(
    `${contract.baseUrl}/api/auth/register`,
    contract
  );

  return response;
}
