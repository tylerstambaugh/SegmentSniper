import useApiConfigStore from '../../../stores/useApiConfigStore';
import useTokenDataStore from '../../../stores/useTokenStore';
import { ApiContract } from '../../../services/Api/ApiCommon/ApiContract';
import getSnipeSegmentsList, {
  SnipeSegmentsRequest,
  SnipeSegmentsResponse,
} from '../../../services/Api/Segment/getSnipeSegmentsList';
import useSnipeSegmentsListStore from '../../../stores/useSnipeSegmentsListStore';
import { useMutation } from '@tanstack/react-query';

export const useSnipeSegments = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const [
    snipeSegmentsList,
    appendSnipeSegmentList,
    setSnipeSegment,
    setSnipedSegmentsList,
  ] = useSnipeSegmentsListStore((state) => [
    state.snipeSegmentsList,
    state.appendSnipeSegmentList,
    state.setSnipeSegment,
    state.setSnipeSegmentsList,
  ]);
  const accessToken = useTokenDataStore(
    (state) => state.tokenData?.accessToken
  );

  const { mutateAsync, isLoading, isError, error, data } = useMutation(trigger);

  async function trigger(request: SnipeSegmentsRequest) {
    const contract: ApiContract<SnipeSegmentsRequest> = {
      baseUrl: apiConfig!.baseRestApiUrl,
      token: accessToken!,
      request: request,
    };

    const response: SnipeSegmentsResponse = await getSnipeSegmentsList(
      contract
    );

    snipeSegmentsList.length === 0
      ? setSnipedSegmentsList(response.snipedSegments)
      : response.snipedSegments.map((s) => setSnipeSegment(s));

    return response.snipedSegments;
  }
  return { mutateAsync, isLoading, isError, error, data };
};
