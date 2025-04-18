import { useMutation } from '@tanstack/react-query';
import { ApiContract } from '../../../services/Api/ApiCommon/ApiContract';
import useApiConfigStore from '../../../stores/useApiConfigStore';
import useTokenDataStore from '../../../stores/useTokenStore';
import postPredictSegment, {
  SegmentPredictionRequest,
  SegmentPredictionResponse,
} from '../../../services/Api/SegmentPrediction/postPredictSegment';

export const usePostPredictSegment = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const accessToken = useTokenDataStore(
    (state) => state.tokenData?.accessToken
  );

  const mutate = useMutation<
    SegmentPredictionResponse,
    Error,
    SegmentPredictionRequest
  >({
    mutationFn: async (request: SegmentPredictionRequest) => {
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
