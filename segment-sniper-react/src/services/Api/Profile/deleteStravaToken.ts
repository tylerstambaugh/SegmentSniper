import { ApiContract } from "../ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "../ApiCommon/UnsuccessfulHttpResponseError";
import { apiDelete } from "../BaseApiService";

export type DeleteStravaTokenRequest = {
  stravaToken: string;
};

export type DeleteStravaTokenResponse = {
  success: boolean;
};

export default async function deleteStravaToken(contract: ApiContract) {
  try {
    const response = apiDelete<
      DeleteStravaTokenRequest,
      DeleteStravaTokenResponse
    >(`${contract.baseUrl}/Profile/UpdateEmailAddress`, contract);

    return response;
  } catch (error) {
    if (error instanceof UnsuccessfulHttpResponseError) {
      throw error;
    }
    throw error;
  }
}
