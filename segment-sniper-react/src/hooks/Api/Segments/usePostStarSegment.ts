import { useMutation } from '@tanstack/react-query';
import useApiConfigStore from '../../../stores/useApiConfigStore';
import useTokenDataStore from '../../../stores/useTokenStore';
import { ApiContract } from '../../../services/Api/ApiCommon/ApiContract';
import postStarSegment, {
  StarSegmentRequest,
} from '../../../services/Api/Segment/postStarSegment';

export const usePostStarSegment = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const accessToken = useTokenDataStore(
    (state) => state.tokenData?.accessToken
  );

  const mutation = useMutation({
    mutationFn: async (request: StarSegmentRequest) => {
      const contract: ApiContract<StarSegmentRequest> = {
        baseUrl: apiConfig!.baseRestApiUrl,
        token: accessToken!,
        request: request,
      };

      return postStarSegment(contract);
    },
  });

  return mutation;
};
