import { TokenData } from "../../../stores/useTokenStore";
import { User } from "../../../stores/useUserStore";

import { ApiContract } from "../ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "../ApiCommon/UnsuccessfulHttpResponseError";
import { apiPost } from "../BaseApiService";

export type LoginRequest = {
  userName: string;
  password: string;
};

export type LoginResponse = {
  tokenData: TokenData;
  userData: User;
};

export default async function postLogin(contract: ApiContract<LoginRequest>) {
  try {
    const response = apiPost<LoginRequest, LoginResponse>(
      `${contract.baseUrl}/auth/login`,
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
