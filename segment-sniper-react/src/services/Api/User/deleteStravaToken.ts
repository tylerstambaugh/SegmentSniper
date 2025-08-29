import { ApiContract } from "../ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "../ApiCommon/UnsuccessfulHttpResponseError";
import { apiDeleteNoRequest } from "../BaseApiService";

export type DeleteStravaTokenResponse = {
  success: boolean;
};

export default async function deleteStravaToken(contract: ApiContract) {
  try {
    const response = apiDeleteNoRequest<DeleteStravaTokenResponse>(
      `${contract.baseUrl}/Profile/RevokeStravaToken`,
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
