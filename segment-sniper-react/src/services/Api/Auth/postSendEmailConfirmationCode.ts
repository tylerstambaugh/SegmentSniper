import { ApiContract } from "../ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "../ApiCommon/UnsuccessfulHttpResponseError";
import { apiPost } from "../BaseApiService";

export type SendEmailConfirmationCodeRequest = {
  accessToken: string;
  refreshToken: string;
};

export type SendEmailConfirmationCodeResponse = {
  success: boolean;
};

export default async function postSendEmailConfirmation(contract: ApiContract) {
  try {
    const response = apiPost<
      SendEmailConfirmationCodeRequest,
      SendEmailConfirmationCodeResponse
    >(`${contract.baseUrl}/auth/send-confirm-email`, contract);
    return response;
  } catch (error) {
    if (error instanceof UnsuccessfulHttpResponseError) {
      throw error;
    }
    throw error;
  }
}
