import { useMutation } from "@tanstack/react-query";
import useApiConfigStore from "../../../stores/useApiConfigStore";
import useTokenDataStore from "../../../stores/useTokenStore";
import { ApiContract } from "../../../services/Api/ApiCommon/ApiContract";
import postStarSegment, {
  StarSegmentRequest,
} from "../../../services/Api/Segment/postStarSegment";

export const usePostStarSegment = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const accessToken = useTokenDataStore(
    (state) => state.tokenData?.accessToken
  );

  const { mutateAsync, isLoading, isError, error, data } = useMutation(trigger);

  async function trigger(request: StarSegmentRequest) {
    const contract: ApiContract<StarSegmentRequest> = {
      baseUrl: apiConfig!.baseUrl,
      token: accessToken!,
      request: request,
    };

    const response = await postStarSegment(contract);
    return response;
  }

  return { mutateAsync, isLoading, isError, error, data };
};
