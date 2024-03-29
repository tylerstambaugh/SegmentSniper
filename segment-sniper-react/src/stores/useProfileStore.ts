import { ProfileData } from "../models/Profile/ProfileData";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";

const devtoolOptions = {
  name: "User Profile Store",
};

const useProfileStore = create<ProfileStore>()(
  immer(
    devtools(
      (set) => ({
        profileData: {
          email: "",
          userId: "",
          userName: "",
          firstName: "",
          hasStravaToken: false,
          stravaTokenExpiresAt: new Date(),
        },
        setProfileData: (profileData: ProfileData) => {
          set((state) => {
            state.profileData = profileData;
          });
        },
      }),
      devtoolOptions
    )
  )
);

export default useProfileStore;

interface ProfileStore {
  profileData: ProfileData;
  setProfileData: (profileData: ProfileData) => void;
}
