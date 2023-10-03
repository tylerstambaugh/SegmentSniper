import { ApiContract } from "./ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "./ApiCommon/UnsuccessfulHttpResponseError";
import { apiPost } from "./BaseApiService";

export type RegisterUserRequest = {
  firstName: string;
  email: string;
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
  try {
    const response = apiPost<RegisterUserRequest, RegisterUserResponse>(
      `${contract.baseUrl}/auth/register`,
      contract
    );
    return response;
  } catch (error) {
    if (error instanceof UnsuccessfulHttpResponseError) {
      throw error;
    }
    throw error;
  }
}
