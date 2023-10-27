import { SegmentListItem } from "../../../models/Segment/SegmentListItem";
import { ApiContract } from "../ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "../ApiCommon/UnsuccessfulHttpResponseError";
import { apiGet } from "../BaseApiService";

export type SegmentListRequest = {
  activityId: string;
};

export type SegmentListResponse = {
  segments: SegmentListItem[];
};

export default async function getSegmentsByActivityId(
  contract: ApiContract<SegmentListRequest>
) {
  try {
    const response = apiGet<SegmentListResponse>(
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
