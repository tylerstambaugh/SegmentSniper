import { useMutation } from "@tanstack/react-query";
import useApiConfigStore from "../../../stores/useApiConfigStore";
import { ApiContract } from "../../../services/Api/ApiCommon/ApiContract";
import useTokenDataStore from "../../../stores/useTokenStore";
import useSegmentListStore from "../../../stores/useSegmentListStore";
import getSegmentListByActivityId from "../../../services/Api/Segment/getSegmentListByActivityId";

export const useGetSegmentListByActivityId = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const tokenData = useTokenDataStore((state) => state.tokenData);
  const setSegmentList = useSegmentListStore((state) => state.setSegmentList);

  const { mutateAsync, isLoading, isError, error, data } = useMutation(trigger);

  async function trigger() {
    const contract: ApiContract = {
      baseUrl: apiConfig!.baseUrl,
      token: tokenData?.accessToken!,
    };

    const response = await getSegmentListByActivityId(contract);

    setSegmentList(response.segments);
  }

  return { mutateAsync, isLoading, isError, error, data };
};
