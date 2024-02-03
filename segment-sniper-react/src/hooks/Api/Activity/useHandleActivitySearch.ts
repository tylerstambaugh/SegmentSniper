import { useMutation } from "@tanstack/react-query";
import { DateTime } from "luxon";
import { ActivityTypes } from "../../../enums/ActivityTypes";
import { ApiContract } from "../../../services/Api/ApiCommon/ApiContract";
import useApiConfigStore from "../../../stores/useApiConfigStore";
import useTokenDataStore from "../../../stores/useTokenStore";
import useActivityListStore from "../../../stores/useActivityListStore";
import getActivityList, {
  ActivityListLookupRequest,
  ActivityListLookupResponse,
} from "../../../services/Api/Activity/getActivityList";

export const useHandleActivitySearch = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const [tokenData] = useTokenDataStore((state) => [state.tokenData]);
  const setActivityList = useActivityListStore(
    (state) => state.setActivityList
  );

  const { mutateAsync, isLoading, isError, error, data } = useMutation(trigger);

  async function trigger(request: ActivityListLookupRequest) {
    const contract: ApiContract<ActivityListLookupRequest> = {
      baseUrl: apiConfig!.baseUrl,
      token: tokenData?.accessToken!,
      request: request,
    };

    let response: ActivityListLookupResponse = { activityList: [] };

    response = await getActivityList(contract);

    if (response.activityList.length > 0) {
      setActivityList(response!.activityList);
    }
  }
  return { mutateAsync, isLoading, isError, error, data };
};
