import { ApiContract } from "../ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "../ApiCommon/UnsuccessfulHttpResponseError";
import { apiGet } from "../BaseApiService";
import { ActivityListLookupResponse } from "./getActivityListByDateRange";

export type ActivityListByIdLookupRequest = {
  activityId: string;
};

export default async function getActivityListById(
  contract: ApiContract<ActivityListByIdLookupRequest>
) {
  try {
    const response = apiGet<ActivityListLookupResponse>(
      `${contract.baseUrl}/sniper/getActivityListById/${contract.request?.activityId}`,
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
