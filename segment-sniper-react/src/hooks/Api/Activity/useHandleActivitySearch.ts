import { useMutation } from "@tanstack/react-query";
import { ActivityTypes } from "../../../enums/ActivityTypes";
import { ApiContract } from "../../../services/Api/ApiCommon/ApiContract";
import useApiConfigStore from "../../../store/useApiConfigStore";
import useTokenDataStore from "../../../store/useTokenStore";
import useActivityListStore from "../../../store/useActivityListStore";
import getSummaryActivityById from "../../../services/Api/Activity/getSummaryActivityById";
import getSummaryActivityByDateRange, {
  SummaryActivityLookupResponse,
} from "../../../services/Api/Activity/getSummaryActivityByDateRange";

export interface ActivitySearchRequest {
  activityId?: string;
  startDate?: Date | null;
  endDate?: Date | null;
  activityType?: ActivityTypes | null;
}

export const useHandleActivitySearch = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const [tokenData] = useTokenDataStore((state) => [state.tokenData]);
  const setActivityList = useActivityListStore(
    (state) => state.setActivityList
  );
  const { mutateAsync, isLoading, isError, error, data } = useMutation(trigger);

  async function trigger(request: ActivitySearchRequest) {
    const contract: ApiContract = {
      baseUrl: apiConfig!.baseUrl,
      token: tokenData?.accessToken!,
      request: request,
    };

    let response: SummaryActivityLookupResponse = { summaryActivities: [] };

    if (request.activityId) {
      response = await getSummaryActivityById(contract);
    } else if (request.startDate && request.endDate) {
      response = await getSummaryActivityByDateRange(contract);
    }

    if (response.summaryActivities.length > 0) {
      setActivityList(response!.summaryActivities);
    }
  }
  return { mutateAsync, isLoading, isError, error, data };
};
