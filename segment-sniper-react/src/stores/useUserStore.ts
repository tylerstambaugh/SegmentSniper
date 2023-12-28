import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const persistOptions = {
  name: "user-store",
  storage: createJSONStorage(() => sessionStorage),
};

const devtoolOptions = {
  name: "User Store",
};

export type User = {
  id?: string | null;
  firstName?: string | null;
  emailAddress?: string | null;
  hasStravaTokenData?: boolean;
  verifiedEmail?: boolean;
  roles?: string[];
};

const initialUserState: User = {
  id: null,
  firstName: null,
  emailAddress: null,
  hasStravaTokenData: false,
  verifiedEmail: false,
  roles: [],
};

const useUserStore = create<UserStore>()(
  immer(
    devtools(
      persist(
        (set) => ({
          user: initialUserState,
          setUser: (user: User | null) =>
            set((state) => {
              state.user = user;
            }),
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
  setUser: (user: User | null) => void;
  resetUserStore: () => void;
}
