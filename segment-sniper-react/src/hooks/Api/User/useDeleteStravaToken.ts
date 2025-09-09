import { useMutation } from '@tanstack/react-query';
import { ApiContract } from '../../../services/Api/ApiCommon/ApiContract';
import useApiConfigStore from '../../../stores/useApiConfigStore';
import deleteStravaToken from '../../../services/Api/User/deleteStravaToken';
import useProfileStore from '../../../stores/useProfileStore';
import useUserStore from '../../../stores/useUserStore';
import { useAuth } from '@clerk/clerk-react';

export const useDeleteStravaToken = () => {
  const apiConfig = useApiConfigStore((state) => state.apiConfig);
  const [profileData, setProfileData] = useProfileStore((state) => [
    state.profileData,
    state.setProfileData,
  ]);
  const [userData, setUserData] = useUserStore((state) => [
    state.user,
    state.setUser,
  ]);
  const { getToken } = useAuth();

  const mutate = useMutation({
    mutationFn: async () => {
      const accessToken = await getToken({ template: 'SegmentSniper' });
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

        setUserData({
          ...userData!,
          stravaRefreshToken: null,
          authUserId: userData!.authUserId ?? null,
          stravaAthleteId: userData!.stravaAthleteId ?? null,
        });
      }
      return response;
    },
  });

  return mutate;
};
