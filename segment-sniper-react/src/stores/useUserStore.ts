import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { AppUserModel } from '../models/AppUserModel';

const persistOptions = {
  name: 'user-store',
  storage: createJSONStorage(() => sessionStorage),
};

const devtoolOptions = {
  enabled: true,
  name: 'User Store',
};

const initialUserState: AppUserModel = {
  authUserId: null,
  stravaRefreshToken: null,
  stravaAthleteId: null,
};

const useUserStore = create<UserStore>()(
  immer(
    devtools(
      persist(
        (set) => ({
          user: initialUserState,
          users: [],
          setUser: (user: AppUserModel | null) => {
            set((state) => {
              state.user = user;
            });
          },
          setUsers: (users: AppUserModel[]) => {
            set((state) => {
              state.users = users;
            });
          },
          resetUserStore: () => {
            set((state) => {
              state.user = null;
            });
          },
        }),
        persistOptions
      ),
      devtoolOptions
    )
  )
);

export default useUserStore;

interface UserStore {
  user: AppUserModel | null;
  users: AppUserModel[] | null;
  setUser: (user: AppUserModel | null) => void;
  setUsers: (users: AppUserModel[]) => void;
  resetUserStore: () => void;
}
