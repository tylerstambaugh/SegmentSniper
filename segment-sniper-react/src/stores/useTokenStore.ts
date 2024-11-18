import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

const persistOptions = {
  name: 'token-data-store',
  storage: createJSONStorage(() => sessionStorage),
};

const devtoolOptions = {
  enabled: true,
  name: 'Token Data Store',
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
    persist(
      devtools(
        (set) => ({
          tokenData: initialTokenState,
          isAuthenticated: false,
          setTokenData: async (tokenData: TokenData | null) => {
            return new Promise<void>((resolve) => {
              set((state) => {
                state.tokenData = tokenData;
                console.log('Setting token data in store');
              });
              resolve();
            });
          },
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
        devtoolOptions
      ),
      persistOptions
    )
  )
);

export default useTokenDataStore;

interface TokenDataStore {
  tokenData: TokenData | null;
  isAuthenticated: boolean;
  setTokenData: (tokenData: TokenData | null) => Promise<void>;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  resetTokenDataStore: () => void;
}
