import { useQuery } from '@tanstack/react-query';
import { ApiContract } from '../../../services/Api/ApiCommon/ApiContract';
import useApiConfigStore from '../../../stores/useApiConfigStore';
import useTokenDataStore from '../../../stores/useTokenStore';
import getSegmentDetails, {
  SegmentDetailsRequest,
  SegmentDetailsResponse,
} from '../../../services/Api/Segment/getSegmentDetails';
import useSegmentDetailsStore from '../../../stores/useSegmentDetailsStore';

export const useGetSegmentDetails = (request: SegmentDetailsRequest) => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const accessToken = useTokenDataStore(
    (state) => state.tokenData?.accessToken
  );
  const addSegmentDetails = useSegmentDetailsStore(
    (state) => state.addSegmentDetails
  );

  const { data, isLoading, isError, error } = useQuery<
    SegmentDetailsResponse,
    Error
  >({
    queryKey: ['segmentDetails', request],
    queryFn: async () => {
      if (!apiConfig || !accessToken)
        throw new Error('Missing API config or token');

      const contract: ApiContract<SegmentDetailsRequest> = {
        baseUrl: apiConfig!.baseRestApiUrl,
        token: accessToken!,
        request: request,
      };

      const response: SegmentDetailsResponse = await getSegmentDetails(
        contract
      );

      addSegmentDetails(response.detailedSegmentUIModel);

      return response;
    },
    enabled: !!apiConfig && !!accessToken,
  });

  return { data, isLoading, isError, error };
};
