import { ApiContract } from "../ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "../ApiCommon/UnsuccessfulHttpResponseError";
import { apiPost } from "../BaseApiService";
import { ActivityListLookupResponse } from "./getActivityListByDateRange";

export type ActivityListByNameLookupRequest = {
  name: string;
};

export default async function getActivityListByName(
  contract: ApiContract<ActivityListByNameLookupRequest>
) {
  try {
    const response = await apiPost<
      ActivityListByNameLookupRequest,
      ActivityListLookupResponse
    >(`${contract.baseUrl}/sniper/getActivityListByName`, contract);
    return response;
  } catch (error) {
    if (error instanceof UnsuccessfulHttpResponseError) {
      throw error;
    }
    throw error;
  }
}
