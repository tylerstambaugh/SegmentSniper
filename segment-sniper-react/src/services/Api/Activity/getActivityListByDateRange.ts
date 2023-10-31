import { ActivityListItem } from "../../../models/Activity/ActivityListItem";

import { ApiContract } from "../ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "../ApiCommon/UnsuccessfulHttpResponseError";
import { apiPost } from "../BaseApiService";

export type ActivityListForDateRangeLookupRequest = {
  activityId: string;
};

export type ActivityListLookupResponse = {
  activityList: ActivityListItem[];
};

export default async function getActivityListByDateRange(
  contract: ApiContract<ActivityListForDateRangeLookupRequest>
) {
  try {
    const response = apiPost<
      ActivityListForDateRangeLookupRequest,
      ActivityListLookupResponse
    >(`${contract.baseUrl}/sniper/getActivityListForDateRange/`, contract);
    return response;
  } catch (error) {
    if (error instanceof UnsuccessfulHttpResponseError) {
      throw error;
    }
    throw error;
  }
}
