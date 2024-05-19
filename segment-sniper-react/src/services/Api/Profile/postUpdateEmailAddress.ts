import { ApiContract } from "../ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "../ApiCommon/UnsuccessfulHttpResponseError";
import { apiPost } from "../BaseApiService";

import { ProfileResponse } from "./getProfile";

export type UpdateEmailAddressRequest = {
  emailAddress: string;
  verificationCode: number;
};

export default async function postUpdateEmailAddress(
  contract: ApiContract<UpdateEmailAddressRequest>
) {
  try {
    const response = apiPost<UpdateEmailAddressRequest, ProfileResponse>(
      `${contract.baseUrl}/Profile/UpdateEmailAddress`,
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
