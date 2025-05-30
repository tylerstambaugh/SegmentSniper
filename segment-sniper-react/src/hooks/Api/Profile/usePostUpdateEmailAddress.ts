import { useMutation } from '@tanstack/react-query';
import { ApiContract } from '../../../services/Api/ApiCommon/ApiContract';
import useApiConfigStore from '../../../stores/useApiConfigStore';
import useProfileStore from '../../../stores/useProfileStore';
import postUpdateEmailAddress, {
  UpdateEmailAddressRequest,
} from '../../../services/Api/Profile/postUpdateEmailAddress';
import useTokenDataStore from '../../../stores/useTokenStore';
import useUserStore from '../../../stores/useUserStore';

export const usePostUpdateEmailAddress = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const accessToken = useTokenDataStore(
    (state) => state.tokenData?.accessToken
  );
  const [setProfileData] = useProfileStore((state) => [state.setProfileData]);
  const [currentUser, setCurrentUser] = useUserStore((state) => [
    state.user,
    state.setUser,
  ]);

  const mutate = useMutation<void, Error, UpdateEmailAddressRequest>({
    mutationFn: async (request: UpdateEmailAddressRequest) => {
      const contract: ApiContract<UpdateEmailAddressRequest> = {
        baseUrl: apiConfig!.baseRestApiUrl,
        request: request,
        token: accessToken!,
      };

      await postUpdateEmailAddress(contract).then((res) => {
        setProfileData(res.profileData);
        setCurrentUser({ ...currentUser, emailAddress: res.profileData.email });
      });
    },
  });
  return mutate;
};
