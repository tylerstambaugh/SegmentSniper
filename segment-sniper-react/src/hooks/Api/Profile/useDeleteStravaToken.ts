import { useMutation } from '@tanstack/react-query';
import { ApiContract } from '../../../services/Api/ApiCommon/ApiContract';
import useApiConfigStore from '../../../stores/useApiConfigStore';
import useTokenDataStore from '../../../stores/useTokenStore';
import deleteStravaToken from '../../../services/Api/Profile/deleteStravaToken';
import useProfileStore from '../../../stores/useProfileStore';
import useUserStore from '../../../stores/useUserStore';

export const useDeleteStravaToken = () => {
  const { mutateAsync, isLoading, isError, error, data } = useMutation(trigger);
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const [profileData, setProfileData] = useProfileStore((state) => [
    state.profileData,
    state.setProfileData,
  ]);
  const [userData, setUserData] = useUserStore((state) => [
    state.user,
    state.setUser,
  ]);
  const accessToken = useTokenDataStore(
    (state) => state.tokenData?.accessToken
  );
  async function trigger() {
    const contract: ApiContract = {
      baseUrl: apiConfig!.baseRestApiUrl,
      token: accessToken!,
    };

    const response = await deleteStravaToken(contract);
    if (response.success) {
      setProfileData({
        ...profileData!,
        stravaRefreshToken: null,
        stravaTokenExpiresAt: null,
      });

      setUserData({ ...userData, hasStravaTokenData: false });
    }
    return response;
  }

  return { mutateAsync, isLoading, isError, error, data };
};
