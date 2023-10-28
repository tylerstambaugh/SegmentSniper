import { SegmentListItem } from "../../../models/Segment/SegmentListItem";
import { ApiContract } from "../ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "../ApiCommon/UnsuccessfulHttpResponseError";
import { apiGet } from "../BaseApiService";

export type SegmentEffortsRequest = {
  activityId: string;
};

export type SegmentEffortsResponse = {
  segments: SegmentListItem[];
};

export default async function getSegmentEffortsByActivityId(
  contract: ApiContract<SegmentEffortsRequest>
) {
  try {
    const response = apiGet<SegmentEffortsResponse>(
      `${contract.baseUrl}/segments?activityId=${contract.request?.activityId}`,
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
