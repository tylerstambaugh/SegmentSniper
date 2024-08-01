
import { SegmentPredictionTrainedModelData } from "../../../models/SegmentPrediction/SegmentPredictionTrainedModelData";
import { ApiContract } from "../ApiCommon/ApiContract";
import UnsuccessfulHttpResponseError from "../ApiCommon/UnsuccessfulHttpResponseError";
import { apiGet } from "../BaseApiService";



export type SegmentPredictionTrainedModelResponse = {
    segmentPredictionTrainedModel: SegmentPredictionTrainedModelData;
};

export default async function getSegmentPredictionTrainedModelData(contract: ApiContract) {
  try {
    const response = apiGet<SegmentPredictionTrainedModelResponse>(
      `${contract.baseUrl}/segmentPrediction/getTrainedModelMetaData`,
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
