import { useMutation } from '@tanstack/react-query';
import useApiConfigStore from '../../../stores/useApiConfigStore';
import useTokenDataStore from '../../../stores/useTokenStore';
import { ApiContract } from '../../../services/Api/ApiCommon/ApiContract';
import postStarSegment, {
  StarSegmentRequest,
  StarSegmentResponse,
} from '../../../services/Api/Segment/postStarSegment';
import { Maybe } from '../../../graphql/generated';

export const usePostStarSegment = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const accessToken = useTokenDataStore(
    (state) => state.tokenData?.accessToken
  );

  const mutation = useMutation<
    Maybe<StarSegmentResponse>,
    Error,
    StarSegmentRequest
  >({
    mutationFn: async (request: StarSegmentRequest) => {
      if (apiConfig && accessToken) {
        const contract: ApiContract<StarSegmentRequest> = {
          baseUrl: apiConfig!.baseRestApiUrl,
          token: accessToken!,
          request: request,
        };

        return await postStarSegment(contract);
      }
      return null;
    },
  });

  return mutation;
};
