import { ApiContract } from "../ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "../ApiCommon/UnsuccessfulHttpResponseError";
import { apiPost } from "../BaseApiService";

export type ResetPasswordRequest = {
  userId: string;
  password: string;
  confirmPassword: string;
};

export type ResetPasswordResponse = {
  success: boolean;
};

export default async function postResetPassword(
  contract: ApiContract<ResetPasswordRequest>
) {
  try {
    const response = apiPost<ResetPasswordRequest, ResetPasswordResponse>(
      `${contract.baseUrl}/auth/reset-password`,
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
