import { DateTime } from "luxon";
import { ApiContract } from "../ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "../ApiCommon/UnsuccessfulHttpResponseError";
import { apiPost } from "../BaseApiService";
import { ActivityListLookupResponse } from "./getActivityListByDateRange";

export type ActivityListLookupRequest = {
  activityName: string;
  startDate: DateTime;
  endDate: DateTime;
  activityTpe: string;
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
