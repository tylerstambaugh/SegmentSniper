import { ActivityListItem } from "../../../models/Activity/ActivityListItem";

import { ApiContract } from "../ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "../ApiCommon/UnsuccessfulHttpResponseError";
import { apiPost } from "../BaseApiService";

export type SummaryActivityByDateRangeLookupRequest = {
  activityId: string;
};

export type SummaryActivityLookupResponse = {
  activityListItems: ActivityListItem[];
};

export default async function getSummaryActivityByDateRange(
  contract: ApiContract<SummaryActivityByDateRangeLookupRequest>
) {
  try {
    const response = apiPost<
      SummaryActivityByDateRangeLookupRequest,
      SummaryActivityLookupResponse
    >(`${contract.baseUrl}/sniper/getSummaryActivityByDateRange/`, contract);
    return response;
  } catch (error) {
    if (error instanceof UnsuccessfulHttpResponseError) {
      throw error;
    }
    throw error;
  }
}
