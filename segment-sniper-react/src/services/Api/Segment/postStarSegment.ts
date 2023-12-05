import { SegmentDetails } from "../../../models/Segment/SegmentDetails";
import { ApiContract } from "../ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "../ApiCommon/UnsuccessfulHttpResponseError";
import { apiPost } from "../BaseApiService";

export type StarSegmentRequest = {
  segmentId?: string;
  star: boolean;
};

export type StarSegmentResponse = {
  detailedSegment: SegmentDetails;
};

export default async function postStarSegment(
  contract: ApiContract<StarSegmentRequest>
) {
  try {
    const response = apiPost<StarSegmentRequest, StarSegmentResponse>(
      `${contract.baseUrl}/sniper/starSegment/${contract.request?.segmentId}`,
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
