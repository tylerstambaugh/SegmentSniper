import { ApiContract } from "../ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "../ApiCommon/UnsuccessfulHttpResponseError";
import { apiGet } from "../BaseApiService";
import { ActivityListLookupResponse } from "./getActivityListByDateRange";

export type ActivityListByNameLookupRequest = {
  name: string;
};

export default async function getActivityListByName(
  contract: ApiContract<ActivityListByNameLookupRequest>
) {
  try {
    const response = await apiGet<ActivityListLookupResponse>(
      `${contract.baseUrl}/sniper/getActivityListByName/${contract.request?.name}`,
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
