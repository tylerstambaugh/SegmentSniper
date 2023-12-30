import { ApiContract } from "../ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "../ApiCommon/UnsuccessfulHttpResponseError";
import { apiGet, apiPost } from "../BaseApiService";

export type VerifyEmailConfirmationCodeRequest = {
  confirmationToken: string;
};

export type VerifyEmailConfirmationCodeResponse = {
  success: boolean;
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
