import { useMutation } from "@tanstack/react-query";
import { DateTime } from "luxon";
import { ActivityTypes } from "../../../enums/ActivityTypes";
import { ApiContract } from "../../../services/Api/ApiCommon/ApiContract";
import useApiConfigStore from "../../../stores/useApiConfigStore";
import useTokenDataStore from "../../../stores/useTokenStore";
import useActivityListStore from "../../../stores/useActivityListStore";
import getActivityListByDateRange, {
  ActivityListLookupResponse,
} from "../../../services/Api/Activity/getActivityListByDateRange";
import getActivityListByName from "../../../services/Api/Activity/getActivityListByName";

export interface ActivitySearchRequest {
  name?: string;
  startDate?: DateTime | null;
  endDate?: DateTime | null;
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

    let response: ActivityListLookupResponse = { activityList: [] };

    if (request.name) {
      response = await getActivityListByName(contract);
    } else if (request.startDate && request.endDate) {
      response = await getActivityListByDateRange(contract);
    }

    if (response.activityList.length > 0) {
      setActivityList(response!.activityList);
    }
  }
  return { mutateAsync, isLoading, isError, error, data };
};
