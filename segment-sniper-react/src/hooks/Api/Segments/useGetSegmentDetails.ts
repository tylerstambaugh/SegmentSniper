import { useMutation } from "@tanstack/react-query";
import { ApiContract } from "../../../services/Api/ApiCommon/ApiContract";
import useApiConfigStore from "../../../stores/useApiConfigStore";
import useTokenDataStore from "../../../stores/useTokenStore";
import getSegmentDetails, {
  SegmentDetailsRequest,
  SegmentDetailsResponse,
} from "../../../services/Api/Segment/getSegmentDetails";
import useSegmentDetailsStore from "../../../stores/useSegmentDetailsStore";

export const useGetSegmentDetails = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const tokenData = useTokenDataStore((state) => state.tokenData);
  const setSegmentDetails = useSegmentDetailsStore(
    (state) => state.setSegmentDetails
  );

  const { mutateAsync, isLoading, isError, error, data } = useMutation(trigger);

  async function trigger(request: SegmentDetailsRequest) {
    const contract: ApiContract = {
      baseUrl: apiConfig!.baseUrl,
      token: tokenData?.accessToken!,
      request: request,
    };

    const response: SegmentDetailsResponse = await getSegmentDetails(contract);

    setSegmentDetails(response.segmentDetails);
  }

  return { mutateAsync, isLoading, isError, error, data };
};
