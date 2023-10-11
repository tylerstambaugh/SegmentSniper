import { DetailedActivity } from "../../../models/Activity/DetailedActivity";
import { ApiContract } from "../ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "../ApiCommon/UnsuccessfulHttpResponseError";
import { apiGet, apiPost } from "../BaseApiService";

export type ActivitySummaryByIdLookupRequest = {
  activityId: string;
};

export type ActivityDetailLookupResponse = {
  detailedActivity: DetailedActivity;
};

export default async function getActivitySummaryById(
  contract: ApiContract<ActivitySummaryByIdLookupRequest>
) {
  try {
    const response = apiGet<ActivityDetailLookupResponse>(
      `${contract.baseUrl}/sniper/getActivitySummaryById/${contract.request?.activityId}`,
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
