import { SegmentDetails } from "../../../models/Segment/SegmentDetails";
import { ApiContract } from "../ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "../ApiCommon/UnsuccessfulHttpResponseError";
import { apiPost } from "../BaseApiService";

export type SegmentPredictionRequest = {
    segmentId: string ;
};

export type SegmentPredictionResponse = {
    predictedTime: number;
    segmentDetails: SegmentDetails;
}

export default async function postPredictSegment(contract: ApiContract<SegmentPredictionRequest>) {
  try {
    const response = apiPost<SegmentPredictionRequest, SegmentPredictionResponse>(
      `${contract.baseUrl}/segmentPrediction/predictSegment`,
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
