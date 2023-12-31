import { TokenData } from "../../../stores/useTokenStore";
import { User } from "../../../stores/useUserStore";
import { ApiContract } from "../ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "../ApiCommon/UnsuccessfulHttpResponseError";
import { apiGet, apiPost } from "../BaseApiService";

export type VerifyEmailConfirmationCodeRequest = {
  confirmationToken: string;
  accessToken: string;
  refreshToken: string;
};

export type VerifyEmailConfirmationCodeResponse = {
  success: boolean;
  userData: User;
};

export default async function postVerifyEmailConfirmationCode(
  contract: ApiContract<VerifyEmailConfirmationCodeRequest>
) {
  try {
    const response = apiPost<
      VerifyEmailConfirmationCodeRequest,
      VerifyEmailConfirmationCodeResponse
    >(`${contract.baseUrl}/auth/confirm-email`, contract);
    return response;
  } catch (error) {
    if (error instanceof UnsuccessfulHttpResponseError) {
      throw error;
    }
    throw error;
  }
}
