import { ProfileData } from '../models/Profile/ProfileData';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';

const devtoolOptions = {
  enabled: true,
  name: 'User Profile Store',
};

const useProfileStore = create<ProfileStore>()(
  immer(
    devtools(
      (set) => ({
        profileData: {
          email: '',
          userId: '',
          userName: '',
          firstName: '',
          hasStravaToken: false,
          stravaRefreshToken: '',
          stravaTokenExpiresAt: null,
        },
        setProfileData: (profileData: ProfileData) => {
          set((state) => {
            state.profileData = profileData;
          });
        },
        resetProfileData: () => {
          set((state) => {
            state.profileData = null;
          });
        },
      }),
      devtoolOptions
    )
  )
);

export default useProfileStore;

interface ProfileStore {
  profileData: ProfileData | null;
  setProfileData: (profileData: ProfileData) => void;
  resetProfileData: () => void;
}
