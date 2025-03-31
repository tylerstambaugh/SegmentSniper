import { useQuery } from '@tanstack/react-query';
import { ApiContract } from '../../../services/Api/ApiCommon/ApiContract';
import useApiConfigStore from '../../../stores/useApiConfigStore';
import useTokenDataStore from '../../../stores/useTokenStore';
import { SegmentPredictionTrainedModelResponse } from '../../../services/Api/SegmentPrediction/getSegmentPredictionTrainedModelData';
import getTrainSegmentPredictionModel from '../../../services/Api/SegmentPrediction/getTrainSegmentPredictionModel';

export const useGetTrainSegmentPredictionModel = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const accessToken = useTokenDataStore(
    (state) => state.tokenData?.accessToken
  );

  const { data, isLoading, isError, error, refetch } = useQuery<
    SegmentPredictionTrainedModelResponse,
    Error
  >({
    queryKey: ['segmentPredictionTrainingDataUiModel'],
    queryFn: async () => {
      const abortController = new AbortController();

      const contract: ApiContract = {
        baseUrl: apiConfig!.baseRestApiUrl,
        token: accessToken!,
        abortController: abortController,
      };

      const response: SegmentPredictionTrainedModelResponse =
        await getTrainSegmentPredictionModel(contract);

      if (!response.segmentPredictionTrainingDataUiModel)
        throw new Error('Failure to train model');
      return response;
    },
    enabled: false,
  });

  return { data, isLoading, isError, error, refetch };
};
