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
  contract: ApiContract<SendPasswordResetEmailRequest>
) {
  try {
    const response = apiPost<
      SendPasswordResetEmailRequest,
      SendPasswordResetEmailResponse
    >(`${contract.baseUrl}/auth/send-reset-password-email`, contract);
    return response;
  } catch (error) {
    if (error instanceof UnsuccessfulHttpResponseError) {
      throw error;
    }
    throw error;
  }
}
