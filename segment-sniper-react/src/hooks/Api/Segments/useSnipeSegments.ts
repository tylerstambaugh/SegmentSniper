import { useQuery } from '@tanstack/react-query';
import useApiConfigStore from '../../../stores/useApiConfigStore';
import useTokenDataStore from '../../../stores/useTokenStore';
import getSnipeSegmentsList, {
  SnipeSegmentsRequest,
  SnipeSegmentsResponse,
} from '../../../services/Api/Segment/getSnipeSegmentsList';
import useSnipeSegmentsListStore from '../../../stores/useSnipeSegmentsListStore';
import { ApiContract } from '../../../services/Api/ApiCommon/ApiContract';

export const useSnipeSegments = (request: SnipeSegmentsRequest) => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const [snipeSegmentsList, setSnipeSegment, setSnipedSegmentsList] =
    useSnipeSegmentsListStore((state) => [
      state.snipeSegmentsList,
      state.setSnipeSegment,
      state.setSnipeSegmentsList,
    ]);
  const accessToken = useTokenDataStore(
    (state) => state.tokenData?.accessToken
  );

  const query = useQuery<SnipeSegmentsResponse, Error>({
    queryKey: ['snipeSegments', request],
    queryFn: async () => {
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
    enabled: !!apiConfig && !!accessToken,
  });

  return query;
};
