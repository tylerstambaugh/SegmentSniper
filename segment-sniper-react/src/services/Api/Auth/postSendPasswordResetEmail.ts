import { ApiContract } from "../ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "../ApiCommon/UnsuccessfulHttpResponseError";
import { apiPost } from "../BaseApiService";

export type SendPasswordResetEmailRequest = {
  emailAddress: string;
};

export type SendPasswordResetEmailResponse = {
  success: boolean;
};

export default async function postSendPasswordResetEmail(
  contract: ApiContract
) {
  try {
    const response = apiPost<
      SendPasswordResetEmailRequest,
      SendPasswordResetEmailResponse
    >(`${contract.baseUrl}/auth/send-password-reset-email`, contract);
    return response;
  } catch (error) {
    if (error instanceof UnsuccessfulHttpResponseError) {
      throw error;
    }
    throw error;
  }
}
