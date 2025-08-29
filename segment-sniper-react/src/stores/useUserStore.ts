import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { User } from '../models/User';

const persistOptions = {
  name: 'user-store',
  storage: createJSONStorage(() => sessionStorage),
};

const devtoolOptions = {
  enabled: true,
  name: 'User Store',
};

const initialUserState: User = {
  id: null,
  authUSerId: null,
  refreshToken: null,
  refreshTokenExpiration: null,
  stravaAthleteId: null,
};

const useUserStore = create<UserStore>()(
  immer(
    devtools(
      persist(
        (set) => ({
          user: initialUserState,
          users: [],
          setUser: (user: User | null) => {
            set((state) => {
              state.user = user;
            });
          },
          setUsers: (users: User[]) => {
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
  user: User | null;
  users: User[] | null;
  setUser: (user: User | null) => void;
  setUsers: (users: User[]) => void;
  resetUserStore: () => void;
}
