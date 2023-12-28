import { ApiContract } from "../ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "../ApiCommon/UnsuccessfulHttpResponseError";
import { apiGet } from "../BaseApiService";

export type SendEmailConfirmationCodeResponse = {
  success: boolean;
};

export default async function getSendEmailConfirmation(contract: ApiContract) {
  try {
    const response = apiGet<SendEmailConfirmationCodeResponse>(
      `${contract.baseUrl}/auth/send-confirm-email`,
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
