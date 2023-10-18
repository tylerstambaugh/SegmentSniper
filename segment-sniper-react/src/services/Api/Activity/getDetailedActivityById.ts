import { DetailedActivity } from "../../../models/Activity/DetailedActivity";
import { ApiContract } from "../ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "../ApiCommon/UnsuccessfulHttpResponseError";
import { apiGet } from "../BaseApiService";

export type DetailedActivityByIdRequest = {
  activityId: string;
};

export type DetailedActivityResponse = {
  detailedActivity: DetailedActivity[];
};

export default async function getDetailedActivityById(
  contract: ApiContract<DetailedActivityByIdRequest>
) {
  try {
    const response = apiGet<DetailedActivityResponse>(
      `${contract.baseUrl}/sniper/getDetailedActivityById/${contract.request?.activityId}`,
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
