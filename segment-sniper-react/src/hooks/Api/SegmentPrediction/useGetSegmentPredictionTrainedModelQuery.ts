import { useQuery } from "@tanstack/react-query";
import { ApiContract } from "../../../services/Api/ApiCommon/ApiContract";
import useApiConfigStore from "../../../stores/useApiConfigStore";
import useTokenDataStore from "../../../stores/useTokenStore";
import getSegmentPredictionTrainedModelData, { SegmentPredictionTrainedModelResponse } from "../../../services/Api/SegmentPrediction/getSegmentPredictionTrainedModelData";

export const useGetSegmentPredictionTrainedModelQuery = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const tokenData = useTokenDataStore((state) => state.tokenData);
  const { data, isLoading, isError, error } = useQuery({
    queryFn: triggerQuery,
    queryKey: ["segmentPredictionTrainedModelData"],
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const abortController = new AbortController();

  async function triggerQuery() {
    const contract: ApiContract = {
      baseUrl: apiConfig!.baseUrl,
      token: tokenData?.accessToken ?? '',
      abortController,
    };

    const response: SegmentPredictionTrainedModelResponse = await getSegmentPredictionTrainedModelData(contract);

    if (!response.segmentPredictionTrainedModel) throw new Error("No segment prediction trained model found");
    // setProfile(response.profileData);
    //setProfileData(response.profileData);
    return response.segmentPredictionTrainedModel;
  }

  return { data, isLoading, isError, error };
};
