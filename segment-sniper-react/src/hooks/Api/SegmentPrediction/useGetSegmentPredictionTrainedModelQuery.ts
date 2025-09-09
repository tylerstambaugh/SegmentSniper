import { useQuery } from '@tanstack/react-query';
import { ApiContract } from '../../../services/Api/ApiCommon/ApiContract';
import useApiConfigStore from '../../../stores/useApiConfigStore';
import getSegmentPredictionTrainedModelData, {
  SegmentPredictionTrainedModelResponse,
} from '../../../services/Api/SegmentPrediction/getSegmentPredictionTrainedModelData';
import { useAuth } from '@clerk/clerk-react';

export const useGetSegmentPredictionTrainedModelQuery = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const { getToken } = useAuth();

  const { data, isLoading, isError, error } = useQuery<
    SegmentPredictionTrainedModelResponse,
    Error
  >({
    queryKey: ['segmentPredictionTrainedModelData'],
    queryFn: async () => {
      const accessToken = await getToken({ template: 'SegmentSniper' });

      const contract: ApiContract = {
        baseUrl: apiConfig!.baseRestApiUrl,
        token: accessToken ?? '',
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
      return response;
    },
    enabled: !!apiConfig,
  });

  return { data, isLoading, isError, error };
};
