import { useMutation } from '@tanstack/react-query';
import useApiConfigStore from '../../../stores/useApiConfigStore';

import { ApiContract } from '../../../services/Api/ApiCommon/ApiContract';
import postStarSegment, {
  StarSegmentRequest,
  StarSegmentResponse,
} from '../../../services/Api/Segment/postStarSegment';
import { Maybe } from '../../../graphql/generated';
import { useAuth } from '@clerk/clerk-react';

export const usePostStarSegment = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const { getToken } = useAuth();

  const mutation = useMutation<
    Maybe<StarSegmentResponse>,
    Error,
    StarSegmentRequest
  >({
    mutationFn: async (request: StarSegmentRequest) => {
      const accessToken = await getToken({ template: 'SegmentSniper' });

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
