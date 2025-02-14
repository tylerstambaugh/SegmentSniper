import { useQuery } from '@tanstack/react-query';
import { ApiContract } from '../../../services/Api/ApiCommon/ApiContract';
import useApiConfigStore from '../../../stores/useApiConfigStore';
import useTokenDataStore from '../../../stores/useTokenStore';
import getSegmentPredictionTrainedModelData, {
  SegmentPredictionTrainedModelResponse,
} from '../../../services/Api/SegmentPrediction/getSegmentPredictionTrainedModelData';

export const useGetSegmentPredictionTrainedModelQuery = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const tokenData = useTokenDataStore((state) => state.tokenData);

  const { data, isLoading, isError, error } = useQuery(
    ['segmentPredictionTrainedModelData'],
    async () => {
      const contract: ApiContract = {
        baseUrl: apiConfig!.baseRestApiUrl,
        token: tokenData?.accessToken ?? '',
      };

      const response: SegmentPredictionTrainedModelResponse =
        await getSegmentPredictionTrainedModelData(contract);

      //   if (!response.segmentPredictionTrainedModel) {
      //     throw new Error("No segment prediction trained model found");
      //   }

      if (response.segmentPredictionTrainingDataUiModel?.createdDate) {
        response.segmentPredictionTrainingDataUiModel.hasTrainedSegmentPredictionModel =
          true;
      }
      return response.segmentPredictionTrainingDataUiModel;
    },
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    }
  );

  return { data, isLoading, isError, error };
};
