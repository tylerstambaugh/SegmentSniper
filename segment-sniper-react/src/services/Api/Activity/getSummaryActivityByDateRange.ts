import { ActivityListItem } from "../../../models/Activity/ActivityListItem";

import { ApiContract } from "../ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "../ApiCommon/UnsuccessfulHttpResponseError";
import { apiPost } from "../BaseApiService";

export type ActivityListByDateRangeLookupRequest = {
  activityId: string;
};

export type ActivityListLookupResponse = {
  activityList: ActivityListItem[];
};

export default async function getSummaryActivityByDateRange(
  contract: ApiContract<ActivityListByDateRangeLookupRequest>
) {
  try {
    const response = apiPost<
      ActivityListByDateRangeLookupRequest,
      ActivityListLookupResponse
    >(`${contract.baseUrl}/sniper/getSummaryActivityByDateRange/`, contract);
    return response;
  } catch (error) {
    if (error instanceof UnsuccessfulHttpResponseError) {
      throw error;
    }
    throw error;
  }
}
