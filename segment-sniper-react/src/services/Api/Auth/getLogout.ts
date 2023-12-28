import { ApiContract } from "../ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "../ApiCommon/UnsuccessfulHttpResponseError";
import { apiGet, apiPost } from "../BaseApiService";

export type RevokeUserTokenResponse = {
  success: boolean;
};

export default async function getLogout(contract: ApiContract) {
  try {
    const response = apiGet<RevokeUserTokenResponse>(
      `${contract.baseUrl}/auth/logout`,
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
