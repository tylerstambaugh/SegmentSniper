import { ApiContract } from "../ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "../ApiCommon/UnsuccessfulHttpResponseError";
import { apiPost } from "../BaseApiService";

export type RevokeUserTokenRequest = {
  userName: string;
};

export type RevokeUserTokenResponse = {
  success: boolean;
};

export default async function postRevokeUserToken(
  contract: ApiContract<RevokeUserTokenRequest>
) {
  try {
    const response = apiPost<RevokeUserTokenRequest, RevokeUserTokenResponse>(
      `${contract.baseUrl}/auth/revoke/${contract.request!.userName}`,
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
