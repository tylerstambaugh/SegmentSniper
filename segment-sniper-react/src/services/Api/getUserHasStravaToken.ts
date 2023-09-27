import { ApiContract } from "./ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "./ApiCommon/UnsuccessfulHttpResponseError";
import { apiGet } from "./BaseApiService";

type response = {
  hasStravaToken: boolean;
};

export default async function getUserHasStravaToken(contract: ApiContract) {
  try {
    const response = apiGet<response>(
      `${contract.baseUrl}/auth/check-for-strava-token`,
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
