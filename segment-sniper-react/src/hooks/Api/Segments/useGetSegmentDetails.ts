import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import useApiConfigStore from '../../../stores/useApiConfigStore';
import useSegmentDetailsStore from '../../../stores/useSegmentDetailsStore';
import { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import getSegmentDetails, {
  SegmentDetailsRequest,
  SegmentDetailsResponse,
} from '../../../services/Api/Segment/getSegmentDetails';

const useGetSegmentDetailsQuery = (
  request: SegmentDetailsRequest,
  options?: Omit<
    UseQueryOptions<SegmentDetailsResponse, Error>,
    'queryKey' | 'queryFn'
  >
) => {
  const { getToken } = useAuth();
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const addSegmentDetails = useSegmentDetailsStore(
    (state) => state.addSegmentDetails
  );

  const abortController = new AbortController();

  async function getSegmentDetailsQuery(): Promise<SegmentDetailsResponse> {
    if (!apiConfig) throw new Error('Missing API config');

    const accessToken = await getToken({ template: 'SegmentSniper' });
    if (!accessToken) throw new Error('Failed to get access token');

    const contract = {
      baseUrl: apiConfig.baseRestApiUrl,
      token: accessToken,
      request,
      abortController,
    };

    const response = await getSegmentDetails(contract);

    addSegmentDetails(response.detailedSegmentUIModel);

    return response;
  }

  const query = useQuery({
    queryKey: ['segmentDetails', request],
    queryFn: getSegmentDetailsQuery,
    ...options,
  });

  useEffect(() => {
    return () => {
      abortController.abort();
    };
  }, []);

  return query;
};

export default useGetSegmentDetailsQuery;
