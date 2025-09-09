import { useMutation } from '@tanstack/react-query';
import { ApiContract } from '../../../services/Api/ApiCommon/ApiContract';
import useApiConfigStore from '../../../stores/useApiConfigStore';
import postPredictSegment, {
  SegmentPredictionRequest,
  SegmentPredictionResponse,
} from '../../../services/Api/SegmentPrediction/postPredictSegment';
import { useAuth } from '@clerk/clerk-react';

export const usePostPredictSegment = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const { getToken } = useAuth();

  const mutate = useMutation<
    SegmentPredictionResponse,
    Error,
    SegmentPredictionRequest
  >({
    mutationFn: async (request: SegmentPredictionRequest) => {
      const accessToken = await getToken({ template: 'SegmentSniper' });
      if (!accessToken) throw new Error('accessToken is missing');
      const contract: ApiContract<SegmentPredictionRequest> = {
        baseUrl: apiConfig!.baseRestApiUrl,
        request: request,
        token: accessToken!,
      };

      const response: SegmentPredictionResponse = await postPredictSegment(
        contract
      );
      return response;
    },
  });

  return mutate;
};
