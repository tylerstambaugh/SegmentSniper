import { SnipedSegmentListItem } from "../../../models/Segment/SnipedSegmentListItem";
import { ApiContract } from "../ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "../ApiCommon/UnsuccessfulHttpResponseError";
import { apiPost } from "../BaseApiService";

export type SnipeSegmentsRequest = {
  activityId?: string;
  secondsOff?: number;
  percentageOff?: number;
  useQom: boolean;
};

export type SnipeSegmentsResponse = {
  snipedSegments: SnipedSegmentListItem[];
};

export default async function postSnipeSegmentsList(
  contract: ApiContract<SnipeSegmentsRequest>
) {
  try {
    const response = apiPost<SnipeSegmentsRequest, SnipeSegmentsResponse>(
      `${contract.baseUrl}/sniper/snipeSegments`,
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
