import { useMutation } from "@tanstack/react-query";
import useApiConfigStore from "../../../stores/useApiConfigStore";
import useTokenDataStore from "../../../stores/useTokenStore";
import { ApiContract } from "../../../services/Api/ApiCommon/ApiContract";
import postStarSegment, {
  StarSegmentRequest,
} from "../../../services/Api/Segment/postStarSegment";
import useSegmentDetailsStore from "../../../stores/useSegmentDetailsStore";

export const usePostStarSegment = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const tokenData = useTokenDataStore((state) => state.tokenData);

  const { mutateAsync, isLoading, isError, error, data } = useMutation(trigger);

  async function trigger(request: StarSegmentRequest) {
    const contract: ApiContract = {
      baseUrl: apiConfig!.baseUrl,
      token: tokenData?.accessToken!,
      request: request,
    };

    const response = await postStarSegment(contract);
    return response;
  }

  return { mutateAsync, isLoading, isError, error, data };
};
