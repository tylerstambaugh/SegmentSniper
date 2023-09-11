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

const useUserStore = create<UserStore>()(
  immer(
    devtools(
      persist(
        (set) => ({
          user: initialUserState,
          setUser: (user: User) =>
            set((state) => {
              state.user = user;
            }),
        }),
        persistOptions
      ),
      devtoolOptions
    )
  )
);

export default useUserStore;

export type User = {
  id: string | null;
  firstName: string | null;
  emailAddress: string | null;
};

export const initialUserState: User = {
  id: null,
  firstName: null,
  emailAddress: null,
};

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
}
