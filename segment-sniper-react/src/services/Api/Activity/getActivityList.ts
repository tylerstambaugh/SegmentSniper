import { DateTime } from "luxon";
import { ApiContract } from "../ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "../ApiCommon/UnsuccessfulHttpResponseError";
import { apiPost } from "../BaseApiService";
import { ActivityListItem } from "../../../models/Activity/ActivityListItem";

export type ActivityListLookupRequest = {
  activityName?: string | null;
  startDate?: DateTime | null;
  endDate?: DateTime | null;
  activityType: string;
};

export type ActivityListLookupResponse = {
  activityList: ActivityListItem[];
};

export default async function getActivityList(
  contract: ApiContract<ActivityListLookupRequest>
) {
  try {
    const response = await apiPost<
      ActivityListLookupRequest,
      ActivityListLookupResponse
    >(`${contract.baseUrl}/sniper/getActivityList`, contract);
    return response;
  } catch (error) {
    if (error instanceof UnsuccessfulHttpResponseError) {
      throw error;
    }
    throw error;
  }
}
