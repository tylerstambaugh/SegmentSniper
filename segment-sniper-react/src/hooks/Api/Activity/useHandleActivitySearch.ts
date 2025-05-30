import { useMutation } from '@tanstack/react-query';
import { ApiContract } from '../../../services/Api/ApiCommon/ApiContract';
import useApiConfigStore from '../../../stores/useApiConfigStore';
import useTokenDataStore from '../../../stores/useTokenStore';
import useActivityListStore from '../../../stores/useActivityListStore';
import getActivityList, {
  ActivityListLookupRequest,
  ActivityListLookupResponse,
} from '../../../services/Api/Activity/getActivityList';

export const useHandleActivitySearch = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const accessToken = useTokenDataStore(
    (state) => state.tokenData?.accessToken
  );
  const setActivityList = useActivityListStore(
    (state) => state.setActivityList
  );

  const mutate = useMutation<void, Error, ActivityListLookupRequest>({
    mutationFn: async (request: ActivityListLookupRequest) => {
      if (apiConfig && accessToken) {
        const contract: ApiContract<ActivityListLookupRequest> = {
          baseUrl: apiConfig!.baseRestApiUrl,
          token: accessToken,
          request: request,
        };

        let response: ActivityListLookupResponse = { activityList: [] };

        response = await getActivityList(contract);

        if (response.activityList.length > 0) {
          setActivityList(response!.activityList);
        }
      }
    },
  });
  return mutate;
};
