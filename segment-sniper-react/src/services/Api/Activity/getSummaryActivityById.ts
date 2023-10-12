import { ApiContract } from "../ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "../ApiCommon/UnsuccessfulHttpResponseError";
import { apiGet } from "../BaseApiService";
import { SummaryActivityLookupResponse } from "./getSummaryActivityByDateRange";

export type SummaryActivityByIdLookupRequest = {
  activityId: string;
};

export default async function getSummaryActivityById(
  contract: ApiContract<SummaryActivityByIdLookupRequest>
) {
  try {
    const response = apiGet<SummaryActivityLookupResponse>(
      `${contract.baseUrl}/sniper/getSummaryActivityById/${contract.request?.activityId}`,
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
