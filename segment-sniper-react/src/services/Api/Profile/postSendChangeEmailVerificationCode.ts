import { ApiContract } from "../ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "../ApiCommon/UnsuccessfulHttpResponseError";
import { apiPatch, apiPost } from "../BaseApiService";
import { ProfileResponse } from "./getProfile";

export type sendChangeEmailVerificationCodeRequest = {
  emailAddress: string;
};

export default async function postSendChangeEmailAddressVerificationCode(
  contract: ApiContract
) {
  try {
    const response = apiPost<
      sendChangeEmailVerificationCodeRequest,
      ProfileResponse
    >(
      `${contract.baseUrl}/Profile/SendChangeEmailAddressVerificationCode`,
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
