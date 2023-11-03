import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const persistOptions = {
  name: "token-data-store",
  storage: createJSONStorage(() => sessionStorage),
};

const devtoolOptions = {
  name: "Token Data Store",
};

export type TokenData = {
  accessToken: string | null;
  refreshToken: string | null;
  expiration: Date | null;
};

const initialTokenState: TokenData = {
  accessToken: null,
  refreshToken: null,
  expiration: null,
};

const useTokenDataStore = create<TokenDataStore>()(
  immer(
    devtools(
      persist(
        (set) => ({
          tokenData: initialTokenState,
          isAuthenticated: false,
          setTokenData: (tokenData: TokenData | null) =>
            set((state) => {
              state.tokenData = tokenData;
            }),
          setIsAuthenticated: (isAuthenticated: boolean) =>
            set((state) => {
              state.isAuthenticated = isAuthenticated;
            }),
          resetTokenDataStore: () => {
            set((state) => {
              state.tokenData = null;
              state.isAuthenticated = false;
            });
          },
        }),
        persistOptions
      ),
      devtoolOptions
    )
  )
);

export default useTokenDataStore;

interface TokenDataStore {
  tokenData: TokenData | null;
  isAuthenticated: boolean;
  setTokenData: (tokenData: TokenData | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  resetTokenDataStore: () => void;
}
