import { useMutation } from '@tanstack/react-query';
import { ApiContract } from '../../../services/Api/ApiCommon/ApiContract';
import useApiConfigStore from '../../../stores/useApiConfigStore';
import useTokenDataStore from '../../../stores/useTokenStore';
import getSegmentDetails, {
  SegmentDetailsRequest,
  SegmentDetailsResponse,
} from '../../../services/Api/Segment/getSegmentDetails';
import useSegmentDetailsStore from '../../../stores/useSegmentDetailsStore';

export const useGetSegmentDetails = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const accessToken = useTokenDataStore(
    (state) => state.tokenData?.accessToken
  );
  const addSegmentDetails = useSegmentDetailsStore(
    (state) => state.addSegmentDetails
  );

  const { mutateAsync, isLoading, isError, error, data } = useMutation(trigger);

  async function trigger(request: SegmentDetailsRequest) {
    const contract: ApiContract<SegmentDetailsRequest> = {
      baseUrl: apiConfig!.baseRestApiUrl,
      token: accessToken!,
      request: request,
    };

    const response: SegmentDetailsResponse = await getSegmentDetails(contract);

    addSegmentDetails(response.detailedSegmentUIModel);
  }

  return { mutateAsync, isLoading, isError, error, data };
};
