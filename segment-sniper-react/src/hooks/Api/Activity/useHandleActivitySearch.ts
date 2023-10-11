import { useMutation } from "@tanstack/react-query";
import { ActivityTypes } from "../../../enums/ActivityTypes";
import { ApiContract } from "../../../services/Api/ApiCommon/ApiContract";
import useApiConfigStore from "../../../store/useApiConfigStore";
import useTokenDataStore from "../../../store/useTokenStore";
import useActivityListStore from "../../../store/useActivityListStore";
import getActivitySummaryById from "../../../services/Api/Activity/getActivitySummaryById";
import getActivitySummaryByDateRange from "../../../services/Api/Activity/getActivitySummaryByDateRange";

export interface ActivitySearchRequest {
  activityId?: string;
  startDate?: Date | null;
  endDate?: Date | null;
  activityType?: ActivityTypes | null;
}

export const useHandleActivitySearch = (request: ActivitySearchRequest) => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const [tokenData] = useTokenDataStore((state) => [state.tokenData]);
  const setActivityList = useActivityListStore(
    (state) => state.setActivityList
  );
  const { mutateAsync, isLoading, isError, error, data } = useMutation(trigger);

  async function trigger() {
    const contract: ApiContract = {
      baseUrl: apiConfig!.baseUrl,
      token: tokenData?.accessToken!,
      request: request,
    };

    if (request.activityId) {
      const response = await getActivitySummaryById(contract);
    } else if (request.startDate && request.endDate) {
      const response = await getActivitySummaryByDateRange(contract);
    }

    //setActivityList();
  }
  return { mutateAsync, isLoading, isError, error, data };
};
