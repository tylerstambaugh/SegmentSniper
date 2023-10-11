import { DetailedActivity } from "../../../models/Activity/DetailedActivity";
import { ApiContract } from "../ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "../ApiCommon/UnsuccessfulHttpResponseError";
import { apiPost } from "../BaseApiService";

export type ActivitySummaryByDateRangeLookupRequest = {
  activityId: string;
};

export type ActivitySummaryByDateRangeLookupResponse = {
  detailedActivity: DetailedActivity;
};

export default async function getActivitySummaryByDateRange(
  contract: ApiContract<ActivitySummaryByDateRangeLookupRequest>
) {
  try {
    const response = apiPost<
      ActivitySummaryByDateRangeLookupRequest,
      ActivitySummaryByDateRangeLookupResponse
    >(
      `${contract.baseUrl}/sniper/getActivitySummaryByDateRange/${contract.request?.activityId}`,
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
