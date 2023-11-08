import { TokenData } from "../../../stores/useTokenStore";
import { User } from "../../../stores/useUserStore";

import { ApiContract } from "../ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "../ApiCommon/UnsuccessfulHttpResponseError";
import { apiPost } from "../BaseApiService";

export type ForgotPasswordRequest = {
  email: string;
};

export type ForgotPasswordResponse = {
  success: boolean;
};

export default async function postLogin(
  contract: ApiContract<ForgotPasswordRequest>
) {
  try {
    const response = apiPost<ForgotPasswordRequest, ForgotPasswordResponse>(
      `${contract.baseUrl}/auth/forgotPassword`,
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
