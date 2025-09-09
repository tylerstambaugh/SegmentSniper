import { useQuery } from '@tanstack/react-query';
import useApiConfigStore from '../../../stores/useApiConfigStore';

import getSnipeSegmentsList, {
  SnipeSegmentsRequest,
  SnipeSegmentsResponse,
} from '../../../services/Api/Segment/getSnipeSegmentsList';
import useSnipeSegmentsListStore from '../../../stores/useSnipeSegmentsListStore';
import { ApiContract } from '../../../services/Api/ApiCommon/ApiContract';
import { useAuth } from '@clerk/clerk-react';

export const useSnipeSegments = (request: SnipeSegmentsRequest) => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const [snipeSegmentsList, setSnipeSegment, setSnipedSegmentsList] =
    useSnipeSegmentsListStore((state) => [
      state.snipeSegmentsList,
      state.setSnipeSegment,
      state.setSnipeSegmentsList,
    ]);
  const { getToken } = useAuth();

  const query = useQuery<SnipeSegmentsResponse, Error>({
    queryKey: ['snipeSegments', request],
    queryFn: async () => {
      const accessToken = await getToken({ template: 'SegmentSniper' });

      if (!apiConfig || !accessToken)
        throw new Error('Missing API config or token');

      const contract: ApiContract<SnipeSegmentsRequest> = {
        baseUrl: apiConfig.baseRestApiUrl,
        token: accessToken,
        request: request,
      };

      const response = await getSnipeSegmentsList(contract);

      if (snipeSegmentsList.length === 0) {
        setSnipedSegmentsList(response.snipedSegments);
      } else {
        response.snipedSegments.forEach((s) => setSnipeSegment(s));
      }

      return response;
    },
    enabled: !!apiConfig,
  });

  return query;
};
