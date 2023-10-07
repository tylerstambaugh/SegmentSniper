import { DetailedActivity } from "../../../models/Activity/DetailedActivity";
import { ApiContract } from "../ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "../ApiCommon/UnsuccessfulHttpResponseError";
import { apiGet, apiPost } from "../BaseApiService";

export type ActivityDetailLookupRequest = {
  activityId: string;
};

export type ActivityDetailLookupResponse = {
  detailedActivity: DetailedActivity;
};

export default async function getActivityDetailById(
  contract: ApiContract<ActivityDetailLookupRequest>
) {
  try {
    const response = apiGet<ActivityDetailLookupResponse>(
      `${contract.baseUrl}/sniper/getActivityDetailById/${contract.request?.activityId}`,
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
