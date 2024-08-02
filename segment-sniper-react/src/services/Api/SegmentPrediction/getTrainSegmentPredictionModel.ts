import { ApiContract } from "../ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "../ApiCommon/UnsuccessfulHttpResponseError";
import { apiGet } from "../BaseApiService";
import { SegmentPredictionTrainedModelResponse } from "./getSegmentPredictionTrainedModelData";

export default async function getTrainSegmentPredictionModel(
  contract: ApiContract
) {
  try {
    const response = apiGet<SegmentPredictionTrainedModelResponse>(
      `${contract.baseUrl}/segmentPrediction/trainModel`,
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
