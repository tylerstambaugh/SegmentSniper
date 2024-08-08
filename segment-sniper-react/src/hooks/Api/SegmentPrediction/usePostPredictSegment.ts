import { useMutation } from "@tanstack/react-query";
import { ApiContract } from "../../../services/Api/ApiCommon/ApiContract";
import useApiConfigStore from "../../../stores/useApiConfigStore";
import useTokenDataStore from "../../../stores/useTokenStore";
import postPredictSegment, { SegmentPredictionRequest } from "../../../services/Api/SegmentPrediction/postPredictSegment";

export const usePostPredictSegment = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const accessToken = useTokenDataStore(
    (state) => state.tokenData?.accessToken
  );

  const { mutateAsync, isLoading, isError, error, data } = useMutation(trigger);

  async function trigger(request: SegmentPredictionRequest) {
    const contract: ApiContract<SegmentPredictionRequest> = {
      baseUrl: apiConfig!.baseUrl,
      request: request,
      token: accessToken!,
    };

    await postPredictSegment(contract);
  }

  return { mutateAsync, isLoading, isError, error, data };
};
