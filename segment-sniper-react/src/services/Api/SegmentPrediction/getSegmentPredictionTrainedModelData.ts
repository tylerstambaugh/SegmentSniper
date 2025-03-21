import { SegmentPredictionTrainingDataUiModel } from '../../../models/SegmentPrediction/SegmentPredictionTrainingDataUiModel';
import { ApiContract } from '../ApiCommon/ApiContract';
import UnsuccessfulHttpResponseError from '../ApiCommon/UnsuccessfulHttpResponseError';
import { apiGet } from '../BaseApiService';

export type SegmentPredictionTrainedModelResponse = {
  segmentPredictionTrainingDataUiModel: SegmentPredictionTrainingDataUiModel | null;
};

export default async function getSegmentPredictionTrainedModelData(
  contract: ApiContract
) {
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
